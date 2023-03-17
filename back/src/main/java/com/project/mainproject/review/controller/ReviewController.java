package com.project.mainproject.review.controller;

import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.review.dto.*;
import com.project.mainproject.review.dto.reply.PatchReplyDto;
import com.project.mainproject.review.dto.reply.PostReplyDto;
import com.project.mainproject.review.dto.reply.SimpleReplyDto;
import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.entity.ReviewReply;
import com.project.mainproject.review.entity.ReviewReport;
import com.project.mainproject.review.mapper.ReviewMapper;
import com.project.mainproject.review.mapper.ReviewReplyMapper;
import com.project.mainproject.review.mapper.ReviewReportMapper;
import com.project.mainproject.review.service.ReviewReplyService;
import com.project.mainproject.review.service.ReviewReportService;
import com.project.mainproject.review.service.ReviewService;
import com.project.mainproject.utils.ResponseBuilder;
import com.project.mainproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewReportService reportService;

    private final ReviewReplyService replyService;
    private final ReviewMapper reviewMapper;
    private final ReviewReportMapper reportMapper;
    private final ReviewReplyMapper replyMapper;

    private final ResponseBuilder responseBuilder;

    /*
     *  약국 리뷰 페이징
     * */
    @GetMapping("/store/{storeIdx}/review")
    public ResponseEntity<PageResponseDto<ListGetStoreReviewDto>> getStoreReview(
            @PathVariable Long storeIdx,
            Pageable pageable
    ) {
        Page<Review> reviews = reviewService.getReviews(storeIdx, pageable);

        ListGetStoreReviewDto responseData = ListGetStoreReviewDto.builder()
                .storeReview(reviewMapper.reviewsToReviewsDto(reviews.getContent()))
                .build();

        PageResponseDto<ListGetStoreReviewDto> response =
                responseBuilder.buildPageResponse(reviews, responseData);

        return ResponseEntity.ok().body(response);
    }

    /*
     *  리뷰 작성
     * */
    @PostMapping(value = "/store/{storeIdx}/review", consumes = {APPLICATION_JSON_VALUE, MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<SingleResponseDto<SimpleReviewDto>> createReview(
            @PathVariable Long storeIdx,
            @RequestPart PostCreateReviewDto postDto,
            @RequestPart(required = false) MultipartFile image
    ) {
        postDto.setStoreIdx(storeIdx);
        Review review = reviewMapper.reviewDtoToReview(postDto);

        Review createdReview = reviewService.saveReview(review, image);

        // 이하 데이터 변환 부분 -> 어디에서?
        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review");

        SimpleReviewDto responseData = reviewMapper.reviewToSimpleReviewDto(createdReview);
        SingleResponseDto<SimpleReviewDto> response =
                responseBuilder.buildSingleCreatedResponse(responseData);

        return ResponseEntity.created(location).body(response);
    }

    /*
     *  리뷰 수정
     * */
    @PatchMapping("/store/{storeIdx}/review/{reviewIdx}")
    public ResponseEntity<SingleResponseDto<SimpleReviewDto>> updateReview(
            @PathVariable Long storeIdx, @PathVariable Long reviewIdx,
            @RequestPart PostUpdateReviewDto patchDto,
            @RequestPart(required = false) MultipartFile image
    ) {
        patchDto.setStoreIdx(storeIdx);
        Review targetReview = reviewService.findVerifiedReview(storeIdx, reviewIdx);
        Review review = reviewMapper.reviewDtoToReview(patchDto, targetReview);

        Review updatedReview = reviewService.updateReview(review, image);

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review");

        SimpleReviewDto responseData = reviewMapper.reviewToSimpleReviewDto(updatedReview);
        SingleResponseDto<SimpleReviewDto> response =
                responseBuilder.buildSingleOkResponse(responseData);

        return ResponseEntity.ok().header("Location", location.toString()).body(response);
    }

    /*
     *  리뷰 삭제
     * */
    @DeleteMapping("/store/{storeIdx}/review/{reviewIdx}")
    public ResponseEntity<URI> deleteReview(@PathVariable Long storeIdx, @PathVariable Long reviewIdx) {
        reviewService.deleteReview(storeIdx, reviewIdx);
        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review");

        return ResponseEntity.noContent().header("Location", location.toString()).build();
    }

    /*
     *  리뷰 신고
     * */
    @PostMapping("/store/{storeIdx}/review/{reviewIdx}/report")
    public ResponseEntity<SingleResponseDto<SimpleReportDto>> reportReview(
            @PathVariable Long storeIdx,
            @PathVariable Long reviewIdx,
            @RequestBody PostReviewReportDto postReportDto
    ) {
        // TODO: content 넣어주는지 확인
        postReportDto.setReviewIdx(reviewIdx);
        ReviewReport reviewReport = reportMapper.postReportDtoToReviewReport(postReportDto);
        ReviewReport createdReport = reportService.createReport(storeIdx, reviewReport);

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);
        SimpleReportDto responseData = reportMapper.reviewReportToSimpleReportDto(createdReport);
        SingleResponseDto<SimpleReportDto> response =
                responseBuilder.buildSingleCreatedResponse(responseData);

        return ResponseEntity.ok().header("Location", location.toString()).body(response);
    }

    /*
     *  대댓글 달기
     * */
    @PostMapping("/store/{storeIdx}/review/{reviewIdx}")
    public ResponseEntity<SingleResponseDto<SimpleReplyDto>> createReviewReply(
            @PathVariable Long storeIdx,
            @PathVariable Long reviewIdx,
            @RequestBody PostReplyDto replyDto
    ) {
        replyDto.setReviewIdx(reviewIdx);
        ReviewReply reviewReply = replyMapper.postReplyDtoToReviewReply(replyDto);
        ReviewReply createdReply = replyService.createReply(storeIdx, reviewReply);

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);
        SimpleReplyDto responseData = replyMapper.reviewReplyToSimpleReplyDto(createdReply);
        SingleResponseDto<SimpleReplyDto> response =
                responseBuilder.buildSingleCreatedResponse(responseData);

        return ResponseEntity.ok().header("Location", location.toString()).body(response);
    }

    /*
     *  대댓글 수정
     * */
    @PatchMapping("/review/{reviewIdx}/review/{replyIdx}")
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
                responseBuilder.buildSingleCreatedResponse(responseData);

        return ResponseEntity.ok().header("Location", location.toString()).body(response);
    }
}
