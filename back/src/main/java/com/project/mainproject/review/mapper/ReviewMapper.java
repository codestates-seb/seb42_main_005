package com.project.mainproject.review.mapper;

import com.project.mainproject.review.dto.PostCreateReviewDto;
import com.project.mainproject.review.entity.Review;
import com.project.mainproject.tag.dto.TagIdDto;
import com.project.mainproject.tag.entity.ReviewTag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {

    @Mapping(target = "user.userIdx", source = "userIdx")
    @Mapping(target = "store.storeIdx", source = "storeIdx")
    Review reviewDtoToReview(PostCreateReviewDto requestBody);

    List<ReviewTag> tagIdsDtoToReviewTags(List<TagIdDto> tagDto);

    @Mapping(target = "tag.tagIdx", source = "tagIdx")
    ReviewTag tagIdDtoToReviewTag(TagIdDto tagDto);

//    default Review reviewDtoToReview(PostCreateReviewDto requestBody) {
//        User user = User.builder().userIdx(requestBody.getUserIdx()).build();
//        Store store = Store.builder().storeIdx(requestBody.getStoreIdx()).build();
//
//        List<ReviewTag> reviewTags = requestBody.getTags().stream()
//                .map(reviewTagDto -> {
//                    return ReviewTag.builder()
//                            .tag(Tag.builder().tagIdx(reviewTagDto.getTagIdx()).build())
//                            .review(Review.builder().build())
//                            .build();
//                }).collect(Collectors.toList());
//
//        return Review.builder()
//                .user(user)
//                .content(requestBody.getContent())
//                .rating(requestBody.getRating())
//                .store(store)
//                .reviewTags(reviewTags)
//                .build();
//    }
}
