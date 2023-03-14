package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReportReviewResponseDto {
    private Long storeIdx;
    private Long userIdx;
    private Long reviewIdx;
    private String content;
    @Builder.Default
    private LocalDateTime reportCreatedAt = LocalDateTime.now();
}
