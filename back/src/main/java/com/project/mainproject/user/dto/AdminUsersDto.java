package com.project.mainproject.user.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AdminUsersDto {

    private List<UserIdx> userIdxs;

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class UserIdx {
        private Long userIdx;
    }
}