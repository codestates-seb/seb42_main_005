package com.project.mainproject.review.service;

import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.review.entity.ReviewReply;
import com.project.mainproject.review.repository.ReviewReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.project.mainproject.review.exception.ReviewExceptionCode.REVIEW_NOT_EXIST;

@Service
@RequiredArgsConstructor
public class ReviewReplyService {

    private final ReviewService reviewService;
    private final ReviewReplyRepository reviewReplyRepository;

    @Transactional
    public ReviewReply createReply(Long storeIdx, ReviewReply reviewReply) {
        // User 검증
        reviewService.verifyReview(storeIdx, reviewReply.getReview().getReviewIdx());
        return reviewReplyRepository.save(reviewReply);
    }

    public ReviewReply findVerifiedReply(Long reviewIdx, Long replyIdx) {
        return reviewReplyRepository.findByReviewReviewIdxAndReplyIdx(reviewIdx, replyIdx)
                .orElseThrow(() -> new BusinessLogicException(REVIEW_NOT_EXIST));
    }

    @Transactional
    public ReviewReply updateReply(ReviewReply reviewReply) {
        // TODO: 유저 검증
        return reviewReplyRepository.save(reviewReply);
    }

}
