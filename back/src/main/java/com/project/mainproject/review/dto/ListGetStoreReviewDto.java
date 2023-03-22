package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ListGetStoreReviewDto {
    private List<StoreReviewPageDto> storeReviews;
}
