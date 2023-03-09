package com.project.mainproject.review.controller;

import com.project.mainproject.dto.PageInfo;
import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.review.dto.GetReportedReviewDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

        PageInfo pageInfo = PageInfo.builder()
                .page(0)
                .size(10)
                .totalPage(100)
                .totalElement(1000)
                .isFinish(false)
                .isFirst(true)
                .build();
        List<GetReportedReviewDto> result = new ArrayList<>();
        for (long i = 1L; i < 16; i++) {
            GetReportedReviewDto build = GetReportedReviewDto.builder()
                    .reviewContent("신고 사유 " + i)
                    .reviewIdx(i)
                    .reportedCount((int) i)
                    .reviewCreatedAt(LocalDateTime.now())
                    .build();
            result.add(build);
        }
        PageResponseDto<List<GetReportedReviewDto>> build = PageResponseDto.<List<GetReportedReviewDto>>builder()
                .response(result)
                .pageInfo(pageInfo)
                .message("success !!")
                .httpCode(HttpStatus.OK.value()).build();
        return ResponseEntity.ok().body(build);
    }

}
