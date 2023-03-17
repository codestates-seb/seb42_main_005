package com.project.mainproject.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.util.Assert;

@Getter
@AllArgsConstructor
public class PostReviewReportDto {
    private Long userIdx;
    private Long reviewIdx;
    private String content;

    public void setParameterIdx(Long reviewIdx) {
        Assert.notNull(reviewIdx, "store_idx must not be null.");
        this.reviewIdx = reviewIdx;
    }
}
