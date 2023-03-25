package com.project.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor // For Test
public class UserSignUpDto {

    private String name;
    private String email;
    private String password;
    private String address;

}