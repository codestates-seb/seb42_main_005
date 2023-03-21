package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SimpleReportDto {
    private Long reportIdx;
    private Long userIdx;
}