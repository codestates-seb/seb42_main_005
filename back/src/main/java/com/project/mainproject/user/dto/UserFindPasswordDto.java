package com.project.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor // For Test
@NoArgsConstructor
public class UserFindPasswordDto {

    private String email;

}
