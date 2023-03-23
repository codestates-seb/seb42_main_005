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
        String username = ((org.springframework.security.core.userdetails.User)authResult.getPrincipal()).getUsername();
        String accessToken = jwtHelper.createAccessToken(username);
        String refreshToken = jwtHelper.createRefreshToken(username);

        User successUser = userRepository.findByEmail(username).orElseThrow(() -> new BusinessLogicException(UserExceptionCode.USER_NOT_FOUND));
        successUser.setLastConnectedDate(LocalDateTime.now());
        userRepository.save(successUser);
        Long userIdx = successUser.getUserIdx();
        String address = successUser.getAddress();
        String userType = successUser.getUserType();
        String name = successUser.getName();

        UserLoginInfoResponse userLoginInfoResponse;
        if(userType.equals("약국회원")) {
            Pharmacy findPharmacy = (Pharmacy) successUser;
            Long storeIdx = findPharmacy.getStore().getStoreIdx();
            userLoginInfoResponse = new UserLoginInfoResponse(userIdx, name, userType, storeIdx);
        }
        else {
            userLoginInfoResponse = new UserLoginInfoResponse(userIdx, name, userType);
        }

        log.info("address {}", address);

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.getWriter().write(new ObjectMapper().writeValueAsString(userLoginInfoResponse));
        response.setHeader("Authorization", "Bearer "+ accessToken);
        response.setHeader("Refresh", refreshToken);
    }

//    public static String[] setGeoPoint(String address) {
//        String apikey = "FAEDA98E-BB2E-309E-9BE1-53CDB7E7CF6F";
//        String searchType = "parcel";
//        String searchAddr = "삼평동 624";
//        String epsg = "epsg:4326";
//
//        StringBuilder sb = new StringBuilder("https://api.vworld.kr/req/address");
//        sb.append("?service=address");
//        sb.append("&request=getCoord");
//        sb.append("&format=json");
//        sb.append("&crs=" + epsg);
//        sb.append("&key=" + apikey);
//        sb.append("&type=" + searchType);
//        sb.append("&address=" + URLEncoder.encode(address, StandardCharsets.UTF_8));
//
//        try{
//            URL url = new URL(sb.toString());
//            BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream(), StandardCharsets.UTF_8));
//
//            JsonParser parser = new JsonParser();
//            JsonObject obj = (JsonObject) parser.parse(reader);
//            JsonObject responseObj = (JsonObject) obj.get("response");
//            JsonObject resultObj = (JsonObject) responseObj.get("result");
//            JsonObject jsPoint = (JsonObject) resultObj.get("point");
//
//            String[] location = new String[2];
//            location[0] = jsPoint.get("x").toString();
//            location[1] = jsPoint.get("y").toString();
//            return location;
//
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
}
