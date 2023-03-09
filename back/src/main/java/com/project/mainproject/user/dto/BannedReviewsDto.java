package com.project.mainproject.user.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class BannedReviewsDto {

    private List<reviewIdx> reviews;


    private static class reviewIdx {
        private Long reviewIdx;
    }
}
