package com.project.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminUsersDto {

    private List<UserIdx> users;

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class UserIdx {
        private Long userIdx;
    }
}