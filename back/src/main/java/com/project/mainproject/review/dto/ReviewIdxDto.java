package com.project.mainproject.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ReviewIdxDto {

    private List<ReviewIdxs> reviews;

    @Getter
    @NoArgsConstructor
    public static class ReviewIdxs {
        private Long reviewIdx;
    }

}
