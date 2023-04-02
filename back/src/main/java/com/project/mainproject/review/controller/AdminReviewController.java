package com.project.mainproject.review.controller;

import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.review.dto.ListGetStoreReviewDto;
import com.project.mainproject.review.dto.ListReportedReviewDto;
import com.project.mainproject.review.dto.ReviewIdxDto;
import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.mapper.ReviewMapper;
import com.project.mainproject.review.service.ReviewService;
import com.project.mainproject.utils.ResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/admin")
@RestController
public class AdminReviewController {

    private final ReviewMapper reviewMapper;
    private final ReviewService reviewService;
    private final ResponseBuilder responseBuilder;

    /*
     *  신고된 리뷰들 조회
     * */
    @GetMapping("/reports")
    public ResponseEntity getReportedReview(
            @PageableDefault(size = 20, sort = "createdAt",direction = Sort.Direction.DESC) Pageable pageable
    ) {
        Page<Review> reviews = reviewService.getReportedReviews(pageable);

        ListReportedReviewDto responseData = ListReportedReviewDto.builder()
                .reportedReviews(reviewMapper.reviewsToReportedReviewsDto(reviews.getContent()))
                .build();

        PageResponseDto<ListGetStoreReviewDto> response =
                responseBuilder.buildPageResponse(reviews, responseData);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/reports")
    public ResponseEntity deleteReviews(@RequestBody ReviewIdxDto deleteReviewsDto) {
        reviewService.deleteReportedReviews(deleteReviewsDto);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/reports")
    public ResponseEntity restoreReviews(@RequestBody ReviewIdxDto recoverReviewsDto) {
        reviewService.recoverReportedReviews(recoverReviewsDto);

        SingleResponseDto repsonse = responseBuilder.buildSingleCreatedResponse(null);

        return ResponseEntity.status(HttpStatus.OK).body(repsonse);
    }

}
