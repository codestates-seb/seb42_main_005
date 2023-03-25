package com.project.mainproject.review.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@NoArgsConstructor
public class ReviewIdxDto {

    private List<ReviewIdxs> reviews;

    @Getter
    @NoArgsConstructor
    public static class ReviewIdxs {
        private Long reviewIdx;
    }

}
