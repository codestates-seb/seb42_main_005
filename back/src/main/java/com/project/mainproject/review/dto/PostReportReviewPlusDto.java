package com.project.mainproject.review.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostReportReviewPlusDto {
    private Long userIdx;
    private String content;
}
