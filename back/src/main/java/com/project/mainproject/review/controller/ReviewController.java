package com.project.mainproject.review.controller;

import com.project.mainproject.dto.PageInfo;
import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dummy.CommonStub;
import com.project.mainproject.review.dto.*;
import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.mapper.ReviewMapper;
import com.project.mainproject.review.service.ReviewService;
import com.project.mainproject.tag.entity.ReviewTag;
import com.project.mainproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;

import static com.project.mainproject.enums.ResultStatus.CREATE_COMPLETED;
import static com.project.mainproject.enums.ResultStatus.PROCESS_COMPLETED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;
    private final String DEFAULT_URI = "/api";

    /*
     *  약국 리뷰 페이징
     * */
    @GetMapping("/store/{storeIdx}/review")
    public ResponseEntity<PageResponseDto<ListGetStoreReviewDto>> getStoreReview(
            @PathVariable Long storeIdx,
            Pageable pageable
    ) {
        //TODO : Service 구현
        Page<Review> reviews = reviewService.getReviews(storeIdx, pageable);

        ListGetStoreReviewDto responseData = ListGetStoreReviewDto.builder()
                .storeReview(reviewMapper.reviewsToReviewsDto(reviews.getContent()))
                .build();

        PageInfo pageInfo = new PageInfo(reviews);
        PageResponseDto<ListGetStoreReviewDto> response = PageResponseDto.<ListGetStoreReviewDto>builder()
                .httpCode(PROCESS_COMPLETED.getHttpCode())
                .message(PROCESS_COMPLETED.getMessage())
                .pageInfo(pageInfo)
                .response(responseData)
                .build();

        return ResponseEntity.ok().body(response);
    }

    /*
     *  리뷰 작성
     * */
    @PostMapping(value = "store/{storeIdx}/review", consumes = {APPLICATION_JSON_VALUE, MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<SingleResponseDto<SimpleReviewDto>> createReview(
            @PathVariable Long storeIdx,
            @RequestPart PostCreateReviewDto postDto,
            @RequestPart(required = false) MultipartFile image
    ) {
        postDto.setStoreIdx(storeIdx);
        Review review = reviewMapper.reviewDtoToReview(postDto);
        List<ReviewTag> reviewTags = reviewMapper.tagIdsDtoToReviewTags(postDto.getTags());

        Review createdReview = reviewService.createReview(review, reviewTags, image);

        // 이하 데이터 변환 부분 -> 어디에서?
        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review");
        SimpleReviewDto responseData = SimpleReviewDto.builder()
                .reviewIdx(createdReview.getReviewIdx())
                .storeIdx(storeIdx)
                .userIdx(postDto.getUserIdx())
                .build();
        SingleResponseDto<SimpleReviewDto> response = SingleResponseDto.<SimpleReviewDto>builder()
                .response(responseData)
                .httpCode(CREATE_COMPLETED.getHttpCode())
                .message(CREATE_COMPLETED.getMessage())
                .build();

        return ResponseEntity.created(location).body(response);
    }

    /*
     *  리뷰 수정
     * */
    @PatchMapping("/store/{storeIdx}/review/{reviewIdx}")
    public ResponseEntity updateReview(@PathVariable Long storeIdx, @PathVariable Long reviewIdx, @RequestBody PostUpdateReviewDto postDto) {
        //TODO : Service 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review");

        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(SimpleReviewDto.builder().reviewIdx(reviewIdx).storeIdx(storeIdx).userIdx(postDto.getUserIdx()).build());

        return ResponseEntity.ok().header("Location", location.toString())
                .body(build);
    }

    /*
     *  리뷰 삭제
     * */
    @DeleteMapping("/store/{storeIdx}/review/{reviewIdx}")
    public ResponseEntity<URI> deleteReview(@PathVariable Long storeIdx, @PathVariable Long reviewIdx) {
        reviewService.deleteReview(storeIdx, reviewIdx);
        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review");

        return ResponseEntity.noContent().header("Location", location.toString())
                .build();
    }

    /*
     *  리뷰 좋아요
     * */
//    @PostMapping("/store/{storeIdx}/review/{reviewIdx}/like")
//    public ResponseEntity reviewLike(@PathVariable Long storeIdx, @PathVariable Long reviewIdx, @RequestBody UserIdxRequestDto userIdxRequestDto) {
//        //TODO : Service 구현
//
//        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);
//
//        SingleResponseDto build = CommonStub.getSingleResponseStub();
//        build.setResponse(PostReviewLikeDto.builder().userIdx(userIdxRequestDto.getUserIdx()).like(true).reviewIdx(reviewIdx).storeIdx(storeIdx).build());
//
//        return ResponseEntity.ok().header("Location", location.toString()).body(build);
//    }

    /*
     *  리뷰 싫어요
     * */
//    @PostMapping("/store/{storeIdx}/review/{reviewIdx}/hate")
//    public ResponseEntity reviewHate(@PathVariable Long storeIdx, @PathVariable Long reviewIdx,@RequestBody UserIdxRequestDto userIdxRequestDto) {
//        //TODO : Service 구현
//
//        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);
//
//        SingleResponseDto build = CommonStub.getSingleResponseStub();
//        build.setResponse(PostReviewHateDto.builder().hate(true).reviewIdx(reviewIdx).storeIdx(storeIdx).userIdx(userIdxRequestDto.getUserIdx()).build());
//
//        return ResponseEntity.ok().header("Location", location.toString()).body(build);
//    }

    /*
     *  리뷰 신고
     * */
    @PostMapping("/store/{storeIdx}/review/{reviewIdx}/report")
    public ResponseEntity reportReview(@PathVariable Long storeIdx, @PathVariable Long reviewIdx, @RequestBody PostReportReviewPlusDto postReportReviewPlusDto) {
        //TODO : 서비스단 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);

        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(ReportReviewResponseDto.builder().userIdx(postReportReviewPlusDto.getUserIdx()).storeIdx(storeIdx).reviewIdx(reviewIdx).content(postReportReviewPlusDto.getContent()).build());

        return ResponseEntity.ok().header("Location", location.toString())
                .body(build);
    }

    /*
     *  대댓글 달기
     * */
    @PostMapping("/store/{storeIdx}/review/{reviewIdx}")
    public ResponseEntity createReviewPlus(@PathVariable Long storeIdx, @PathVariable Long reviewIdx, @RequestBody PostReportReviewPlusDto postReportReviewPlusDto) {
        //TODO : 서비스단 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);

        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(SimpleReviewDto.builder().reviewIdx(reviewIdx).storeIdx(storeIdx).userIdx(1L).build());

        return ResponseEntity.created(location).body(build);
    }
}
