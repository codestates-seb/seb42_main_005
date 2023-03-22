package com.project.mainproject.security;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseToken {
    private String accessToken;
    private String refreshToken;
}