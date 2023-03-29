package com.project.mainproject.review.repository;

import com.project.mainproject.review.entity.ReviewReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewReportRepository extends JpaRepository<ReviewReport, Long> {
    @Modifying
    @Query(value = " UPDATE ReviewReport rr " +
            "           SET rr.reportStatus = 'SUCCESS' " +
            "         WHERE rr.review.reviewIdx IN :reviewsIdx "
    )
    int updatedReportStatusToSuccess(List<Long> reviewsIdx);
}
