package com.project.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BannedReviewsDto {
    // TODO: 삭제

    private List<ReviewIdx> reviews;

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class ReviewIdx {
        private Long reviewIdx;
    }
}
