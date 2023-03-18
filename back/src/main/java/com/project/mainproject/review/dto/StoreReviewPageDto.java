package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class StoreReviewPageDto {
    private Long reviewIdx;
    private String content;
    private int rating;
    private String reviewImage;
    private Long userIdx;
    private String userName;
    private String profileImage;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<ReplyDto> replies;

    @Getter
    @Builder
    public static class ReplyDto {
        private Long replyIdx;
        private String content;
        private Long userIdx;
        private String userName;
        private String profileImage;
        private LocalDateTime createdAt;
    }
}
