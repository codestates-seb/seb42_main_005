package com.project.mainproject.review.mapper;

import com.project.mainproject.review.dto.PostReviewReportDto;
import com.project.mainproject.review.entity.ReviewReport;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewReportMapper {

    @Mapping(target = "user.userIdx", source = "userIdx")
    @Mapping(target = "review.reviewIdx", source = "reviewIdx")
    ReviewReport postReportDtoToReviewReport(PostReviewReportDto postReportDto);

//    @Mapping(target = "userIdx", source = "user.userIdx")
//    SimpleReportDto reviewReportToSimpleReportDto(ReviewReport review);

}
