package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.util.Assert;

@Getter
@Builder
public class PostUpdateReviewDto {
    private Long userIdx;
    private Long storeIdx;
    private String content;
    private String image;
    private int rating;

    public PostUpdateReviewDto setStoreIdx(Long storeIdx) {
        Assert.notNull(storeIdx, "store_idx must not be null.");
        this.storeIdx = storeIdx;

        return this;
    }
}