package com.project.mainproject.review.service;

import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.review.entity.ReviewReply;
import com.project.mainproject.review.repository.ReviewReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.project.mainproject.review.exception.ReviewExceptionCode.REVIEW_NOT_EXIST;
import static com.project.mainproject.review.exception.ReviewExceptionCode.WRITER_MISS_MATCH;

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
    public ReviewReply updateReply(ReviewReply reviewReply, Long loginUserIdx) {
        validWriter(loginUserIdx, reviewReply);
        return reviewReplyRepository.save(reviewReply);
    }
    
    @Transactional
    public void deleteReply(Long reviewIdx, Long replyIdx, Long loginUserIdx) {
        ReviewReply reviewReply = findVerifiedReply(reviewIdx, replyIdx);
        validWriter(loginUserIdx, reviewReply);

        reviewReplyRepository.delete(reviewReply);
    }

    private void validWriter(Long loginUserIdx, ReviewReply reviewReply) {
        if (loginUserIdx != reviewReply.getUser().getUserIdx())
            throw new BusinessLogicException(WRITER_MISS_MATCH);
    }

}
