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
    private List<String> tags;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
