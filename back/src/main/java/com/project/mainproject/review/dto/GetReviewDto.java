package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetReviewDto {
    private Long reviewIdx;
    private Long storeIdx;
    private String storeName;
    private String content;
}