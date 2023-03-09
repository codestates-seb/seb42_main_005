package com.project.mainproject.user.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class AdminUsersDto {

    private List<userIdx> users;


    private static class userIdx {
        private Long userIdx;
    }
}