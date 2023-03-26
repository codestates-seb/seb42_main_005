package com.project.mainproject.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReviewIdxDto {

    private List<ReviewIdxs> reviews;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewIdxs {
        private Long reviewIdx;
    }

}
