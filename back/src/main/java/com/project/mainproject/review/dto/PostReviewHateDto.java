package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostReviewHateDto {
    private Long reviewIdx;
    private Long storeIdx;
    private Long userIdx;
    private Boolean hate;
}
