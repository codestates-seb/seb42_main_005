package com.project.mainproject.review.controller;

import com.project.mainproject.dto.PageInfo;
import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.enums.ResultStatus;
import com.project.mainproject.review.dto.PostCreateReviewDto;
import com.project.mainproject.review.dto.SimpleReviewDto;
import com.project.mainproject.review.dto.StoreReviewPageDto;
import com.project.mainproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

        PageInfo pageInfo = PageInfo.builder().page(0).size(10).totalPage(2).totalElement(20).isFirst(true).isFinish(false).build();
        List<StoreReviewPageDto> result = new ArrayList<>();
        for (Long i = 1L; i < 20; i++) {
            StoreReviewPageDto build = StoreReviewPageDto.builder()
                    .reviewIdx(i)
                    .rating(4)
                    .content("내공 얌얌" + i)
                    .tags(List.of("신선함", "주차장이 넓어요", "친절함"))
                    .modifiedAt(LocalDateTime.now())
                    .createdAt(LocalDateTime.now())
                    .build();
            result.add(build);
        }

        PageResponseDto<List<StoreReviewPageDto>> build = PageResponseDto.<List<StoreReviewPageDto>>builder().response(result).pageInfo(pageInfo).httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode()).message(ResultStatus.PROCESS_COMPLETED.getMessage()).build();

        return ResponseEntity.ok().body(build);
    }

    /*
     *  리뷰 작성
     * */
    @PostMapping("/{storeIdx}/review")
    public ResponseEntity createReview(@PathVariable Long storeIdx, @RequestBody PostCreateReviewDto postDto) {
        //TODO : Service 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review");
        SingleResponseDto<Long> build = SingleResponseDto.<Long>builder().message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .response(storeIdx)
                .build();

        return ResponseEntity.created(location).body(build);
    }

    /*
     *  리뷰 수정
     * */
    @PatchMapping("/store/{storeIdx}/review/{reviewIdx}")
    public ResponseEntity updateReview(@PathVariable Long storeIdx, @PathVariable Long reviewIdx, @RequestBody PostCreateReviewDto postDto) {
        //TODO : Service 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review");
        SingleResponseDto<SimpleReviewDto> build = SingleResponseDto.<SimpleReviewDto>builder().message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .response(SimpleReviewDto.builder().reviewIdx(reviewIdx).storeIdx(storeIdx).build())
                .build();

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
        SingleResponseDto<SimpleReviewDto> build = SingleResponseDto.<SimpleReviewDto>builder().message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .response(SimpleReviewDto.builder().storeIdx(storeIdx).build())
                .build();
        return ResponseEntity.ok().header("Location", location.toString())
                .body(build);
    }

    /*
     *  리뷰 좋아요
     * */
    @PostMapping("/store/{storeIdx}/review/{reviewIdx}/like")
    public ResponseEntity reviewLike(@PathVariable Long storeIdx, @PathVariable Long reviewIdx) {
        //TODO : Service 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);
        SingleResponseDto<SimpleReviewDto> build = SingleResponseDto.<SimpleReviewDto>builder().message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .response(SimpleReviewDto.builder().reviewIdx(reviewIdx).storeIdx(storeIdx).build())
                .build();
        return ResponseEntity.ok().header("Location", location.toString())
                .body(build);
    }

    /*
     *  리뷰 싫어요
     * */
    @PostMapping("/store/{storeIdx}/review/{reviewIdx}/hate")
    public ResponseEntity reviewHate(@PathVariable Long storeIdx, @PathVariable Long reviewIdx) {
        //TODO : Service 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);
        SingleResponseDto<SimpleReviewDto> build = SingleResponseDto.<SimpleReviewDto>builder().message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .response(SimpleReviewDto.builder().reviewIdx(reviewIdx).storeIdx(storeIdx).build())
                .build();
        return ResponseEntity.created(location).body(build);
    }

    /*
     *  리뷰 신고
     * */
    @PostMapping("/store/{storeIdx}/review/{reviewIdx}/report")
    public ResponseEntity reportReview(@PathVariable Long storeIdx, @PathVariable Long reviewIdx, @RequestBody String content) {
        //TODO : 서비스단 구현

        URI location = UriCreator.createUri("/api/store/" + storeIdx + "/review/" + reviewIdx);

        SingleResponseDto<SimpleReviewDto> build = SingleResponseDto.<SimpleReviewDto>builder().message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .response(SimpleReviewDto.builder().reviewIdx(reviewIdx).storeIdx(storeIdx).build())
                .build();
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

        SingleResponseDto<SimpleReviewDto> build = SingleResponseDto.<SimpleReviewDto>builder().message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .response(SimpleReviewDto.builder().reviewIdx(reviewIdx).storeIdx(storeIdx).build())
                .build();
        return ResponseEntity.created(location).body(build);
    }
}
