package com.project.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor // For Test
public class UserPatchDto {
    private String name;
    private String address;
    private String password;
}
