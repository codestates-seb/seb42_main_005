package com.project.mainproject.review.dto.reply;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SimpleReplyDto {
    private Long reportIdx;
    private Long userIdx;
}