package com.project.mainproject.review.repository;

import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.enums.ReviewStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query(value = " SELECT r.reviewIdx" +
                    "  FROM Review r " +
                    " WHERE r.reviewStatus = 'POSTED' " +
                    "     AND r.reviewIdx IN(SELECT rr.review.reviewIdx " +
                    "                          FROM ReviewReport rr " +
                    "                         WHERE rr.reportStatus = 'REGISTERED' " +
                    "                      GROUP BY rr.review.reviewIdx " +
                    "                        HAVING count(rr) >= :reportCount) "
    )
    List<Long> findReviewsIdxByRegisteredReportCount(@Param("reportCount") long reportCount);

    @Modifying
    @Query(value = " UPDATE Review r " +
            "           SET r.reviewStatus = 'BLINDED' " +
            "         WHERE r.reviewIdx IN :reviewsIdx "
    )
    int updatedReviewStatusToBlinded(List<Long> reviewsIdx);
}
