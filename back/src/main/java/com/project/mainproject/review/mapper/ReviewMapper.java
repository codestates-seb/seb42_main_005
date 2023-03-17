package com.project.mainproject.review.mapper;

import com.project.mainproject.review.dto.*;
import com.project.mainproject.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {
    @Mapping(target = "user.userIdx", source = "userIdx")
    @Mapping(target = "store.storeIdx", source = "storeIdx")
    Review reviewDtoToReview(PostCreateReviewDto requestBody);

    Review reviewDtoToReview(PostUpdateReviewDto requestBody, @MappingTarget Review review);

    @Mapping(target = "userIdx", source = "user.userIdx")
    @Mapping(target = "storeIdx", source = "store.storeIdx")
    SimpleReviewDto reviewToSimpleReviewDto(Review review);

    List<StoreReviewPageDto> reviewsToReviewsDto(List<Review> reviews);

    @Mapping(target = "reviewImage", expression = "java(review.getReviewImages().size() == 0 " +
                                                        "? null " +
                                                        ": review.getReviewImages().get(0).getImagePath())")
    StoreReviewPageDto reviewToReviewDto(Review review);

    List<GetReviewDto> reviewsToUserReviewsDto(List<Review> reviews);

    @Mapping(target = "storeIdx", source = "store.storeIdx")
    @Mapping(target = "storeName", source = "store.name")
    GetReviewDto reviewToGetReviewDto(Review reviews);
}
