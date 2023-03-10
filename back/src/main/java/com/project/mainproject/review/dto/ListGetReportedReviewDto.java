package com.project.mainproject.review.dto;

import lombok.Builder;

import java.util.List;

@Builder
public class ListGetReportedReviewDto {
    List<GetReportedReviewDto> reportedReview;

}
