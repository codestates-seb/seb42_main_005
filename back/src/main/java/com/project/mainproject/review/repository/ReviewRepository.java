package com.project.mainproject.review.repository;

import com.project.mainproject.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByStoreStoreIdxAndReviewIdx(Long storeIdx, Long reviewIdx);
}
