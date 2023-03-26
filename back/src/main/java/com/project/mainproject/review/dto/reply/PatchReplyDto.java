package com.project.mainproject.review.dto.reply;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.util.Assert;

@Getter
@ToString
@Builder
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