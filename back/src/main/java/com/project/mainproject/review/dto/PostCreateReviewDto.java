package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PostCreateReviewDto {
    private Long userIdx;
    private List<Long> tags;
    private String content;
    private String image;
    private int rating;
}