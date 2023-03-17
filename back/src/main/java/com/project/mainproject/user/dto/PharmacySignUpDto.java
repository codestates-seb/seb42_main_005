package com.project.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PharmacySignUpDto {
    private String name;
    private String email;
    private String password;
    private String address;
}
