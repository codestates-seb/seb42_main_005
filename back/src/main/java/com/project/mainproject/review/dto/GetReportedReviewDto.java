package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetReportedReviewDto {
    private Long reviewIdx;
    private String reviewContent;
    private int reportedCount;
    private LocalDateTime reviewCreatedAt;

}
