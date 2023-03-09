package com.project.mainproject.user.dto;

import com.project.mainproject.review.dto.GetReviewDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class UserReviewDto {

    List<GetReviewDto> reviews;

}
