package com.project.mainproject.review.controller;

import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dto.UserIdxRequestDto;
import com.project.mainproject.dummy.CommonStub;
import com.project.mainproject.review.dto.*;
import com.project.mainproject.review.dummy.ReviewStub;
import com.project.mainproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReviewController {
    private final String DEFAULT_URI = "/api";

    /*
     *  약국 리뷰 페이징
     * */
    @GetMapping("/store/{storeIdx}/review")
    public ResponseEntity getStoreReview(Pageable pageable, @PathVariable Long storeIdx) {
        //TODO : Service 구현

        PageResponseDto build = CommonStub.getPageResponseStub();
        build.setResponse(ListGetStoreReviewDto.builder().storeReview(ReviewStub.getStoreReviewPageListStub()).build());
        return ResponseEntity.ok().body(build);
    }

    /*
     *  리뷰 작성
     * */
    @PostMapping("store/{storeIdx}/review")
    public ResponseEntity createReview(@PathVariable Long storeIdx, @RequestBody PostCreateReviewDto postDto) {
        //TODO : Service 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review");
        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(SimpleReviewDto.builder().reviewIdx(1L).storeIdx(storeIdx).userIdx(postDto.getUserIdx()).build());
        System.out.println("location = " + location);
        return ResponseEntity.created(location).body(build);
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
    public ResponseEntity deleteReview(@PathVariable Long storeIdx, @PathVariable Long reviewIdx) {
        //TODO : Service 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review");

        return ResponseEntity.noContent().header("Location", location.toString())
                .build();
    }

    /*
     *  리뷰 좋아요
     * */
    @PostMapping("/store/{storeIdx}/review/{reviewIdx}/like")
    public ResponseEntity reviewLike(@PathVariable Long storeIdx, @PathVariable Long reviewIdx, @RequestBody UserIdxRequestDto userIdxRequestDto) {
        //TODO : Service 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);

        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(PostReviewLikeDto.builder().userIdx(userIdxRequestDto.getUserIdx()).like(true).reviewIdx(reviewIdx).storeIdx(storeIdx).build());

        return ResponseEntity.ok().header("Location", location.toString()).body(build);
    }

    /*
     *  리뷰 싫어요
     * */
    @PostMapping("/store/{storeIdx}/review/{reviewIdx}/hate")
    public ResponseEntity reviewHate(@PathVariable Long storeIdx, @PathVariable Long reviewIdx,@RequestBody UserIdxRequestDto userIdxRequestDto) {
        //TODO : Service 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);

        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(PostReviewHateDto.builder().hate(true).reviewIdx(reviewIdx).storeIdx(storeIdx).userIdx(userIdxRequestDto.getUserIdx()).build());

        return ResponseEntity.ok().header("Location", location.toString()).body(build);
    }

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
