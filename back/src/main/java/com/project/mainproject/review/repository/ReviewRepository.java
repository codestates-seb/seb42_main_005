package com.project.mainproject.review.repository;

import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.enums.ReviewStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByStoreStoreIdxAndReviewIdx(Long storeIdx, Long reviewIdx);
    Page<Review> findAllByStoreStoreIdxAndReviewStatusOrderByCreatedAtDesc(Long storeIdx,
                                                                           ReviewStatus reviewStatus,
                                                                           Pageable pageable);
    Page<Review> findAllByUserUserIdxAndReviewStatusOrderByCreatedAtDesc(Long userIdx,
                                                                     ReviewStatus reviewStatus,
                                                                     Pageable pageable);
}
