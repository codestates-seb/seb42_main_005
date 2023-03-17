package com.project.mainproject.review.mapper;

import com.project.mainproject.review.dto.PostCreateReviewDto;
import com.project.mainproject.review.dto.StoreReviewPageDto;
import com.project.mainproject.review.entity.Review;
import com.project.mainproject.tag.dto.TagIdDto;
import com.project.mainproject.tag.entity.ReviewTag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

import static com.project.mainproject.review.dto.StoreReviewPageDto.Tag;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {

    @Mapping(target = "user.userIdx", source = "userIdx")
    @Mapping(target = "store.storeIdx", source = "storeIdx")
    Review reviewDtoToReview(PostCreateReviewDto requestBody);

    List<ReviewTag> tagIdsDtoToReviewTags(List<TagIdDto> tagDto);

    @Mapping(target = "tag.tagIdx", source = "tagIdx")
    ReviewTag tagIdDtoToReviewTag(TagIdDto tagDto);

    List<StoreReviewPageDto> reviewsToReviewsDto(List<Review> reviews);
    @Mapping(target = "tags", source = "reviewTags")
    @Mapping(target = "reviewImage", expression = "java(review.getReviewImages().size() == 0 " +
                                                        "? null " +
                                                        ": review.getReviewImages().get(0).getImagePath())")
    StoreReviewPageDto reviewToReviewDto(Review review);

    @Mapping(target = "tagIdx", source = "tag.tagIdx")
    @Mapping(target = "name", source = "tag.name")
    Tag reviewTagToTagDto(ReviewTag reviewTag);

}
