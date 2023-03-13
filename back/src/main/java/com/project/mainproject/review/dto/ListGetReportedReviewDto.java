package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ListGetReportedReviewDto {
    List<GetReportedReviewDto> reportedReview;

}
