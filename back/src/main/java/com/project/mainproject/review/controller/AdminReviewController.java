package com.project.mainproject.review.controller;

import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dummy.CommonStub;
import com.project.mainproject.review.dto.ListGetReportedReviewDto;
import com.project.mainproject.review.dummy.ReviewStub;
import com.project.mainproject.user.dto.BannedReviewsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/admin")
@RestController
public class AdminReviewController {
    /*
     *  신고된 리뷰들 조회
     * */
    @GetMapping("/reports")
    public ResponseEntity getReportedReview(Pageable pageable) {
        //TODO: 서비스단 구현

        PageResponseDto build = CommonStub.getPageResponseStub();
        build.setResponse(ListGetReportedReviewDto.builder().reportedReview(ReviewStub.getReportedReviewDtoListStub()).build());

        return ResponseEntity.status(HttpStatus.OK).body(build);
    }

    @DeleteMapping("/banned")
    public ResponseEntity deleteReviews(@RequestBody BannedReviewsDto bannedReviewsDto) {
        //TODO

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/banned")
    public ResponseEntity restoreReviews(@RequestBody BannedReviewsDto bannedReviewsDto) {
        //TODO

        SingleResponseDto tmpResponse = CommonStub.getSingleResponseStub();
        return ResponseEntity.status(HttpStatus.OK).body(tmpResponse);
    }
}
