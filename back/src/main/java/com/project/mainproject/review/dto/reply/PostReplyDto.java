package com.project.mainproject.review.dto.reply;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.util.Assert;

@Getter
@AllArgsConstructor
public class PostReplyDto {
    private Long userIdx;
    private Long reviewIdx;
    private String content;

    public void setReviewIdx(Long reviewIdx) {
        Assert.notNull(reviewIdx, "store_idx must not be null.");
        this.reviewIdx = reviewIdx;
    }
}