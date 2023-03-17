package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class StoreReviewPageDto {
    private Long reviewIdx;
    private String content;
    private int rating;
    private String reviewImage;
    private List<Tag> tags;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    @Getter
    @Builder
    public static class Tag {
        private Long tagIdx;
        private String name;
    }
}
