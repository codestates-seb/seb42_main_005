package com.project.mainproject.review.mapper;

import com.project.mainproject.review.dto.PostCreateReviewDto;
import com.project.mainproject.review.dto.PostUpdateReviewDto;
import com.project.mainproject.review.dto.StoreReviewPageDto;
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

    List<StoreReviewPageDto> reviewsToReviewsDto(List<Review> reviews);
    @Mapping(target = "reviewImage", expression = "java(review.getReviewImages().size() == 0 " +
                                                        "? null " +
                                                        ": review.getReviewImages().get(0).getImagePath())")
    StoreReviewPageDto reviewToReviewDto(Review review);
}
