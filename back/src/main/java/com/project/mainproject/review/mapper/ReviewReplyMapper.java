package com.project.mainproject.review.mapper;

import com.project.mainproject.review.dto.reply.PostReplyDto;
import com.project.mainproject.review.dto.reply.SimpleReplyDto;
import com.project.mainproject.review.entity.ReviewReply;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewReplyMapper {

    @Mapping(target = "user.userIdx", source = "userIdx")
    @Mapping(target = "review.reviewIdx", source = "reviewIdx")
    ReviewReply postReplyDtoToReviewReply(PostReplyDto replyDto);

    @Mapping(target = "userIdx", source = "user.userIdx")
    SimpleReplyDto reviewReplyToSimpleReplyDto(ReviewReply review);

}
