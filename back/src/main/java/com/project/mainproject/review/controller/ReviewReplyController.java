package com.project.mainproject.review.controller;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.review.dto.reply.PatchReplyDto;
import com.project.mainproject.review.dto.reply.PostReplyDto;
import com.project.mainproject.review.dto.reply.SimpleReplyDto;
import com.project.mainproject.review.entity.ReviewReply;
import com.project.mainproject.review.mapper.ReviewReplyMapper;
import com.project.mainproject.review.service.ReviewReplyService;
import com.project.mainproject.utils.ResponseBuilder;
import com.project.mainproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")
public class ReviewReplyController {

    private final ReviewReplyService replyService;
    private final ReviewReplyMapper replyMapper;
    private final ResponseBuilder responseBuilder;

    /*
     *  대댓글 달기
     * */
    @PostMapping("/{reviewIdx}")
    public ResponseEntity<SingleResponseDto<SimpleReplyDto>> createReviewPlus(
            @PathVariable Long reviewIdx,
            @RequestBody PostReplyDto replyDto
    ) {
        replyDto.setReviewIdx(reviewIdx);
        ReviewReply reviewReply = replyMapper.postReplyDtoToReviewReply(replyDto);
        ReviewReply createdReply = replyService.createReply(replyDto.getStoreIdx(), reviewReply);

        URI location = UriCreator.createUri("/api/store/" + replyDto.getStoreIdx() + "/review/" + reviewIdx);
        SimpleReplyDto responseData = replyMapper.reviewReplyToSimpleReplyDto(createdReply);
        SingleResponseDto<SimpleReplyDto> response =
                responseBuilder.buildSingleCreatedResponse(responseData);

        return ResponseEntity.created(location).body(response);
    }

    /*
     *  대댓글 수정
     * */
    @PatchMapping("/{reviewIdx}/review/{replyIdx}")
    public ResponseEntity<SingleResponseDto<SimpleReplyDto>> updateReviewReply(
            @PathVariable Long reviewIdx,
            @PathVariable Long replyIdx,
            @RequestBody PatchReplyDto replyDto
    ) {
        replyDto.setParamsIdx(reviewIdx, replyIdx);
        ReviewReply targetReply = replyService.findVerifiedReply(reviewIdx, replyIdx);

        ReviewReply reviewReply = replyMapper.reviewDtoToReviewReply(replyDto, targetReply);
        ReviewReply updatedReply = replyService.updateReply(reviewReply);

        URI location = UriCreator.createUri("/api/store/" + replyDto.getStoreIdx() + "/review/" + reviewIdx);
        SimpleReplyDto responseData = replyMapper.reviewReplyToSimpleReplyDto(updatedReply);
        SingleResponseDto<SimpleReplyDto> response =
                responseBuilder.buildSingleOkResponse(responseData);

        return ResponseEntity.ok().header("Location", location.toString()).body(response);
    }

}
