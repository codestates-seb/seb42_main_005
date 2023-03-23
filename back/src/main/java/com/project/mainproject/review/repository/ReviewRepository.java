package com.project.mainproject.review.repository;

import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.enums.ReviewStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByStoreStoreIdxAndReviewIdx(Long storeIdx, Long reviewIdx);
    Page<Review> findAllByStoreStoreIdxAndReviewStatusOrderByCreatedAtDesc(Long storeIdx,
                                                                           ReviewStatus reviewStatus,
                                                                           Pageable pageable);
    List<Review> findAllByUserUserIdxAndReviewStatusOrderByCreatedAtDesc(Long userIdx,
                                                                         ReviewStatus reviewStatus);

    Page<Review> findByReviewStatusNotAndReportCntGreaterThan(ReviewStatus reviewStatus, int reportCnt, Pageable pageable);

    @Query(value = "SELECT r FROM Review r WHERE r.reviewIdx in :reviewIdx AND r.reviewStatus = :reviewStatus")
    List<Review> findAllByIdAndReviewStatus(List<Long> reviewIdx, ReviewStatus reviewStatus);
}
