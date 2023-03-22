package com.project.mainproject.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.mainproject.user.dto.UserLoginDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private JwtHelper jwtHelper;

    public AuthenticationFilter(AuthenticationManager authenticationManager, JwtHelper jwtHelper) {
        super(authenticationManager);
        this.jwtHelper = jwtHelper;
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
        String username = ((org.springframework.security.core.userdetails.User)authResult.getPrincipal()).getUsername();

        String accessToken = jwtHelper.createAccessToken(username);
        String refreshToken = jwtHelper.createRefreshToken(username);

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        ResponseToken responseToken = new ResponseToken(accessToken, refreshToken);

        response.setHeader("Access-Control-Allow-Origin", "*");
//        response.getWriter().write(new ObjectMapper().writeValueAsString(responseToken));
        response.setHeader("Authorization", "Bearer "+ accessToken);
        Cookie cookie = new Cookie("Refresh", refreshToken);
        response.addCookie(cookie);
    }
}
