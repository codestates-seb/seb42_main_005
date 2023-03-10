package com.project.mainproject.review.controller;

import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dummy.CommonStub;
import com.project.mainproject.review.dto.PostCreateReviewDto;
import com.project.mainproject.review.dto.SimpleReviewDto;
import com.project.mainproject.review.dummy.ReviewStub;
import com.project.mainproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
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
        build.setResponse(ReviewStub.getStoreReviewPageListStub());
        return ResponseEntity.ok().body(build);
    }

    /*
     *  리뷰 작성
     * */
    @PostMapping("/{storeIdx}/review")
    public ResponseEntity createReview(@PathVariable Long storeIdx, @RequestBody PostCreateReviewDto postDto) {
        //TODO : Service 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review");
        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(storeIdx);

        return ResponseEntity.created(location).body(build);
    }

    /*
     *  리뷰 수정
     * */
    @PatchMapping("/store/{storeIdx}/review/{reviewIdx}")
    public ResponseEntity updateReview(@PathVariable Long storeIdx, @PathVariable Long reviewIdx, @RequestBody PostCreateReviewDto postDto) {
        //TODO : Service 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review");

        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(SimpleReviewDto.builder().reviewIdx(reviewIdx).storeIdx(storeIdx).build());

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
    public ResponseEntity reviewLike(@PathVariable Long storeIdx, @PathVariable Long reviewIdx) {
        //TODO : Service 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);

        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(SimpleReviewDto.builder().reviewIdx(reviewIdx).storeIdx(storeIdx).build());

        return ResponseEntity.ok().header("Location", location.toString()).body(build);
    }

    /*
     *  리뷰 싫어요
     * */
    @PostMapping("/store/{storeIdx}/review/{reviewIdx}/hate")
    public ResponseEntity reviewHate(@PathVariable Long storeIdx, @PathVariable Long reviewIdx) {
        //TODO : Service 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);

        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(SimpleReviewDto.builder().reviewIdx(reviewIdx).storeIdx(storeIdx).build());

        return ResponseEntity.created(location).body(build);
    }

    /*
     *  리뷰 신고
     * */
    @PostMapping("/store/{storeIdx}/review/{reviewIdx}/report")
    public ResponseEntity reportReview(@PathVariable Long storeIdx, @PathVariable Long reviewIdx, @RequestBody String content) {
        //TODO : 서비스단 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);

        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(SimpleReviewDto.builder().reviewIdx(reviewIdx).storeIdx(storeIdx).build());

        return ResponseEntity.ok().header("Location", location.toString())
                .body(build);
    }

    /*
     *  대댓글 달기
     * */
    @PostMapping("/store/{storeIdx}/review/{reviewIdx}")
    public ResponseEntity createReviewPlus(@PathVariable Long storeIdx, @PathVariable Long reviewIdx, @RequestBody String content) {
        //TODO : 서비스단 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);

        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(SimpleReviewDto.builder().reviewIdx(reviewIdx).storeIdx(storeIdx).build());

        return ResponseEntity.created(location).body(build);
    }
}
