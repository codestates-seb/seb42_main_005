package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ListGetUserReviewDto {

    private List<GetUserReviewDto> reviews;

    @Getter
    @Builder
    public static class GetUserReviewDto {
        private Long reviewIdx;
        private String content;
        private int rating;
        private String storeName;
        private LocalDateTime modifiedAt;
    }
}