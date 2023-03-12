package com.project.mainproject.review.dto;

import com.project.mainproject.tag.dto.TagIdDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PostUpdateReviewDto {
    private Long userIdx;
    private List<TagIdDto> tags;
    private String content;
    private String image;
    private int rating;
}