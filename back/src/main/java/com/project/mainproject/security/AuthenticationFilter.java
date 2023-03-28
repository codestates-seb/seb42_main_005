package com.project.mainproject.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.user.dto.UserLoginDto;
import com.project.mainproject.user.dto.UserLoginInfoResponse;
import com.project.mainproject.user.entity.Pharmacy;
import com.project.mainproject.user.entity.User;
import com.project.mainproject.user.exception.UserExceptionCode;
import com.project.mainproject.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Slf4j
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private JwtHelper jwtHelper;
    private UserRepository userRepository;

    public AuthenticationFilter(AuthenticationManager authenticationManager, JwtHelper jwtHelper, UserRepository userRepository) {
        super(authenticationManager);
        this.jwtHelper = jwtHelper;
        this.userRepository = userRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            UserLoginDto userLoginDto =
                    new ObjectMapper().readValue(request.getInputStream(), UserLoginDto.class);

            return getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userLoginDto.getEmail(),
                            userLoginDto.getPassword(),
                            new ArrayList<>()
                    )
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        String username = ((org.springframework.security.core.userdetails.User) authResult.getPrincipal()).getUsername();
        String accessToken = jwtHelper.createAccessToken(username);
        String refreshToken = jwtHelper.createRefreshToken(username);

        User successUser = userRepository.findByEmail(username).orElseThrow(() -> new BusinessLogicException(UserExceptionCode.USER_NOT_FOUND));
        successUser.setLastConnectedDate(LocalDateTime.now());
        userRepository.save(successUser);
        Long userIdx = successUser.getUserIdx();
        String address = successUser.getAddress();
        String userRole = successUser.getRole();
        String userType = successUser.getUserType();
        String name = successUser.getName();

        UserLoginInfoResponse userLoginInfoResponse;
        if (userType.equals("약국회원")) {
            Pharmacy findPharmacy = (Pharmacy) successUser;
            Long storeIdx = findPharmacy.getStore().getStoreIdx();
            userLoginInfoResponse = new UserLoginInfoResponse(userIdx, name, userRole, userType, storeIdx, address);
        } else {
            userLoginInfoResponse = new UserLoginInfoResponse(userIdx, name, userRole, userType, address);
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.getWriter().write(new ObjectMapper().writeValueAsString(userLoginInfoResponse));
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
    }
}