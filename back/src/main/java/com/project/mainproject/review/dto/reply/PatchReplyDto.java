package com.project.mainproject.review.dto.reply;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.util.Assert;

@Getter
@AllArgsConstructor
public class PatchReplyDto {
    private Long storeIdx;
    private Long userIdx;
    private String content;

    private Long reviewIdx;
    private Long replyIdx;

    public void setParamsIdx(Long reviewIdx, Long replyIdx) {
        Assert.notNull(reviewIdx, "reviewIdx must not be null.");
        Assert.notNull(replyIdx, "replyIdx must not be null.");
        this.reviewIdx = reviewIdx;
        this.replyIdx = replyIdx;
    }
}