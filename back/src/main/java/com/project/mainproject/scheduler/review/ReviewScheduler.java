package com.project.mainproject.scheduler.review;

import com.project.mainproject.review.repository.ReviewReportRepository;
import com.project.mainproject.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReviewScheduler {
    private final ReviewRepository reviewRepository;
    private final ReviewReportRepository reviewReportRepository;

    // 신고 등록 시 10개 체크!
//    @Scheduled(cron = "0 0 * * * *")
//    @Transactional
//    public void blindReview() {
//        long reportCount = 10;
//
//        List<Long> reviewsIdx = reviewRepository.findReviewsIdxByRegisteredReportCount(reportCount);
//
//        int blindedCount = reviewRepository.updatedReviewStatusToBlinded(reviewsIdx);
//        int reportSuccessCount = reviewReportRepository.updatedReportStatusToSuccess(reviewsIdx);
//
//        log.info(blindedCount + "개의 리뷰가 블라인드 처리 되었습니다.");
//        log.info(reportSuccessCount + "개의 신고가 성공 처리 되었습니다.");
//    }

}
