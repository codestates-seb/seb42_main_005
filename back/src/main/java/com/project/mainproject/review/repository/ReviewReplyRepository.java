package com.project.mainproject.review.repository;

import com.project.mainproject.review.entity.ReviewReply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewReplyRepository extends JpaRepository<ReviewReply, Long> {
    Optional<ReviewReply> findByReviewReviewIdxAndReplyIdx(Long reviewIdx, Long replyIdx);
}
