package com.project.mainproject.review.dto;

import com.project.mainproject.tag.dto.TagIdDto;
import lombok.Builder;
import lombok.Getter;
import org.springframework.util.Assert;

import java.util.List;

@Getter
@Builder
public class PostCreateReviewDto {
    private Long userIdx;
    private Long storeIdx;
    private List<TagIdDto> tags;
    private String content;
    private String image;
    private int rating;

    public PostCreateReviewDto setStoreIdx(Long storeIdx) {
        Assert.notNull(storeIdx, "store_idx must not be null.");
        this.storeIdx = storeIdx;

        return this;
    }
}