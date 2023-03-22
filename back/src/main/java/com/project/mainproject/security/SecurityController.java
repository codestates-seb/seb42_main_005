package com.project.mainproject.security;

import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/token")
public class SecurityController {
    private JwtHelper jwtHelper;

    @PostMapping
    public ResponseEntity reaccess(HttpServletRequest request) {
        String refreshToken = getToken(request);
        ResponseToken responseToken = new ResponseToken();
        if(jwtHelper.validateJwtToken(refreshToken)) {
            String username = jwtHelper.getEmailFromJwtToken(refreshToken);
            String newAccessToken = jwtHelper.createAccessToken(username);
            responseToken.setAccessToken(newAccessToken);
        }

        return ResponseEntity.ok(responseToken);
    }

    private String getToken(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }
}
