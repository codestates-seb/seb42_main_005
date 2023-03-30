package com.project.mainproject.review.service;

import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.entity.ReviewReport;
import com.project.mainproject.review.enums.ReviewStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewReportService {

    private final ReviewService reviewService;

    @Transactional
    public void createReport(Long storeIdx, ReviewReport reviewReport) {
        Review review = reviewService.findVerifiedReview(storeIdx, reviewReport.getReview().getReviewIdx());
        review.addReport(reviewReport);

        if (review.getReportCnt() >= 9) // Transaction 종료 전 -> 9부터 검사
            review.setReviewStatus(ReviewStatus.BLINDED);
    }

}
