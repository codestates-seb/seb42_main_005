package com.project.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor // For Test
@NoArgsConstructor
public class UserFindPasswordDto {

    private String email;

}
