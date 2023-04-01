package com.project.mainproject.review.controller;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.review.dto.reply.PatchReplyDto;
import com.project.mainproject.review.dto.reply.PostReplyDto;
import com.project.mainproject.review.dto.reply.SimpleReplyDto;
import com.project.mainproject.review.entity.ReviewReply;
import com.project.mainproject.review.mapper.ReviewReplyMapper;
import com.project.mainproject.review.service.ReviewReplyService;
import com.project.mainproject.utils.CheckLoginUser;
import com.project.mainproject.utils.ResponseBuilder;
import com.project.mainproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
     *  리뷰 답변 달기
     * */
    @PostMapping("/{reviewIdx}/reply")
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
     *  리뷰 답변 수정
     * */
    @PatchMapping("/{reviewIdx}/reply/{replyIdx}")
    public ResponseEntity<SingleResponseDto<SimpleReplyDto>> updateReviewReply(
            @PathVariable Long reviewIdx,
            @PathVariable Long replyIdx,
            @RequestBody PatchReplyDto replyDto,
            @AuthenticationPrincipal Object principal
    ) {
        Long userIdx = CheckLoginUser.getContextIdx(principal);

        replyDto.setParamsIdx(reviewIdx, replyIdx);

        ReviewReply targetReply = replyService.findVerifiedReply(reviewIdx, replyIdx);
        ReviewReply reviewReply = replyMapper.reviewDtoToReviewReply(replyDto, targetReply);
        ReviewReply updatedReply = replyService.updateReply(reviewReply, userIdx);

        URI location = UriCreator.createUri("/api/store/" + replyDto.getStoreIdx() + "/review/" + reviewIdx);
        SimpleReplyDto responseData = replyMapper.reviewReplyToSimpleReplyDto(updatedReply);
        SingleResponseDto<SimpleReplyDto> response =
                responseBuilder.buildSingleOkResponse(responseData);

        return ResponseEntity.ok().header("Location", location.toString()).body(response);
    }

    /*
     *  리뷰 답변 삭제
     * */
    @DeleteMapping("/{reviewIdx}/reply/{replyIdx}")
    public ResponseEntity<URI> deleteReviewReply(@PathVariable Long reviewIdx,
                                                 @PathVariable Long replyIdx,
                                                 @AuthenticationPrincipal Object principal) {
        Long userIdx = CheckLoginUser.getContextIdx(principal);
        replyService.deleteReply(reviewIdx, replyIdx, userIdx);

        return ResponseEntity.noContent().build();
    }

}
