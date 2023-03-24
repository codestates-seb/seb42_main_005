package com.project.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class UserPatchDto {
    private String name;
    private String address;
    private String password;
    private String newPassword;
}
