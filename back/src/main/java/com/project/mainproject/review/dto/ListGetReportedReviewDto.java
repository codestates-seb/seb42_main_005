package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
public class ListGetReportedReviewDto {
    List<GetReportedReviewDto> reportedReview;

    @Getter
    @Builder
    public static class GetReportedReviewDto {
        private Long reviewIdx;
        private String reviewContent;
        private int reportedCount;
        private LocalDateTime reviewCreatedAt;

    }

}
