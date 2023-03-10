package com.project.mainproject.review.controller;

import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dummy.CommonStub;
import com.project.mainproject.review.dto.ListGetReportedReviewDto;
import com.project.mainproject.review.dummy.ReviewStub;
import com.project.mainproject.user.dto.BannedReviewsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.project.mainproject.enums.ResultStatus.PROCESS_COMPLETED;

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

        PageResponseDto<ListGetReportedReviewDto> build = PageResponseDto.<ListGetReportedReviewDto>builder()
                .response(ListGetReportedReviewDto.builder()
                        .reportedReview(ReviewStub
                                .getReportedReviewDtoList())
                        .build())
                .pageInfo(CommonStub.pageInfoStub())
                .message(PROCESS_COMPLETED.getMessage())
                .httpCode(PROCESS_COMPLETED.getHttpCode())
                .build();

        return ResponseEntity.ok().body(build);
    }

    @DeleteMapping("/banned")
    public ResponseEntity deleteReviews(BannedReviewsDto bannedReviewsDto) {
        //TODO

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/banned")
    public ResponseEntity restoreReviews(BannedReviewsDto bannedReviewsDto) {
        //TODO

        SingleResponseDto<Object> build = SingleResponseDto.builder()
                .message(PROCESS_COMPLETED.getMessage())
                .httpCode(PROCESS_COMPLETED.getHttpCode())
                .build();
        return ResponseEntity.ok().body(build);
    }
}
