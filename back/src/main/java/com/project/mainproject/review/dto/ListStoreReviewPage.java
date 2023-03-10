package com.project.mainproject.review.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ListStoreReviewPage {
    List<StoreReviewPageDto> storeReview;
}
