package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SimpleReviewDto {
    private Long storeIdx;
    private Long reviewIdx;
}
