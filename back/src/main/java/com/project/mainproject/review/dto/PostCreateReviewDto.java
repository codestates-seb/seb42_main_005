package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.util.Assert;

@Getter
@ToString
@Builder
public class PostCreateReviewDto {
    private Long userIdx;
    private Long storeIdx;
    private String content;
    private int rating;

    public PostCreateReviewDto setStoreIdx(Long storeIdx) {
        Assert.notNull(storeIdx, "store_idx must not be null.");
        this.storeIdx = storeIdx;

        return this;
    }
}