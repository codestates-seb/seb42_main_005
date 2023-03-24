package com.project.mainproject.review.service;

import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.entity.ReviewReport;
import com.project.mainproject.review.repository.ReviewReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewReportService {

    private final ReviewService reviewService;
    private final ReviewReportRepository reportRepository;

    @Transactional
    public void createReport(Long storeIdx, ReviewReport reviewReport) {
        Review review = reviewService.findVerifiedReview(storeIdx, reviewReport.getReview().getReviewIdx());
        review.addReport(reviewReport);
    }
}
