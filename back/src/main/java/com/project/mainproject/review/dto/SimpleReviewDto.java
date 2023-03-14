package com.project.mainproject.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
public class SimpleReviewDto {
    private Long storeIdx;
    private Long reviewIdx;
    private Long userIdx;
}
