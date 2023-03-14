package com.project.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor // For Test
public class UserSignUpDto {

    private String name;
    private String email;
    private String password;
    private String address;

}