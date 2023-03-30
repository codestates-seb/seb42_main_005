package com.project.mainproject.review.service;

import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.entity.ReviewReport;
import com.project.mainproject.review.enums.ReviewStatus;
import com.project.mainproject.user.entity.User;
import com.project.mainproject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.project.mainproject.review.enums.ReportStatus.REGISTERED;

@Service
@RequiredArgsConstructor
public class ReviewReportService {

    private final ReviewService reviewService;
    private final UserService userService;

    @Transactional
    public void createReport(Long storeIdx, ReviewReport reviewReport) {
        User user = userService.validUser(reviewReport.getUser().getUserIdx());
        Review review = reviewService.findVerifiedReview(storeIdx, reviewReport.getReview().getReviewIdx());

        reviewReport.setReportStatus(REGISTERED);
        reviewReport.setUser(user);
        review.addReport(reviewReport);

        if (review.getReportCnt() >= 9) // Transaction 종료 전 -> 9부터 검사
            review.setReviewStatus(ReviewStatus.BLINDED);
    }
}
