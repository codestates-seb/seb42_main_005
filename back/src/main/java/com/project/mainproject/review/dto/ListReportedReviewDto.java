package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class ListReportedReviewDto {
    private List<ReportedReviewDto> reportedReviews;

    @Getter
    @Builder
    public static class ReportedReviewDto {
        private Long reviewIdx;
        private String content;
        private String email;
        private LocalDateTime createdAt;
        private int reportCnt;

    }
}
