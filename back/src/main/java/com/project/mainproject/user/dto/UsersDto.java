package com.project.mainproject.user.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class UsersDto {

    private List<UserDto> users;

    @Getter
    @Builder
    public static class UserDto {
        private Long userIdx;
        private String userType;
        private String name;
        private String email;
        private LocalDateTime createdAt;
        private int reviewCnt;
        private int reportCnt;
        private String userStatus;
        private LocalDateTime recoverAt;
    }

}
