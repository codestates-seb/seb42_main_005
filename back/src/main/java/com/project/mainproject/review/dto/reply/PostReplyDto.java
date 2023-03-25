package com.project.mainproject.review.dto.reply;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.util.Assert;

@Getter
@ToString
@AllArgsConstructor
public class PostReplyDto {
    private Long storeIdx;
    private Long userIdx;
    private String content;

    private Long reviewIdx;

    public void setReviewIdx(Long reviewIdx) {
        Assert.notNull(reviewIdx, "reviewIdx must not be null.");
        this.reviewIdx = reviewIdx;
    }
}