package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class StoreReviewPageDto {
    private Long reviewIdx;
    private String content;
    private int rating;
    private String reviewImage;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    @Getter
    @Builder
    public static class Tag {
        private Long tagIdx;
        private String name;
    }
}
