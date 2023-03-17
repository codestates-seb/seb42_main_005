package com.project.mainproject.review.service;

import com.project.mainproject.review.entity.ReviewReply;
import com.project.mainproject.review.repository.ReviewReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewReplyService {

    private final ReviewService reviewService;
    private final ReviewReplyRepository reviewReplyRepository;

    public ReviewReply createReply(Long storeIdx, ReviewReply reviewReply) {
        // User 검증
        reviewService.verifyReview(storeIdx, reviewReply.getReview().getReviewIdx());
        return reviewReplyRepository.save(reviewReply);
    }

}
