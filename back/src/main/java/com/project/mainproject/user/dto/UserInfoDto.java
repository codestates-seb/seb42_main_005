package com.project.mainproject.user.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class UserInfoDto {

    private Long userIdx;
    private LocalDateTime dob;
    private LocalDateTime createdAt;
    private String name;
    private String email;
    private String address;

}
