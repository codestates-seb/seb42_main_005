package com.project.mainproject.review.entity;

import com.project.mainproject.audit.Auditable;
import com.project.mainproject.review.enums.ReportStatus;
import com.project.mainproject.review.enums.ReviewStatus;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.user.entity.User;
import lombok.*;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static com.project.mainproject.review.enums.ReportStatus.REGISTERED;
import static javax.persistence.CascadeType.ALL;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;
import static lombok.Builder.Default;

@Entity
@Getter
@Setter
@Table(name = "REVIEW")
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
public class Review extends Auditable {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long reviewIdx;
    private String content;
    private int rating;

    @Formula("(SELECT count(1) FROM review_report r WHERE r.review_idx = review_idx AND r.report_status = 'REGISTERED')")
    private int reportCnt;

    @Default
    @Enumerated(value = STRING)
    private ReviewStatus reviewStatus = ReviewStatus.POSTED;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_IDX")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "STORE_IDX")
    private Store store;

    @Default
    @OneToMany(mappedBy = "review", fetch = LAZY, cascade = {ALL}, orphanRemoval = true)
    private List<ReviewImage> reviewImages = new ArrayList<>();

    @Default
    @OneToMany(mappedBy = "review", fetch = LAZY, cascade = {ALL}, orphanRemoval = true)
    private List<ReviewReply> reviewReplies = new ArrayList<>();

    @Default
    @OneToMany(mappedBy = "review", fetch = LAZY, cascade = {ALL}, orphanRemoval = true)
    private List<ReviewReport> reviewReports = new ArrayList<>();

    //### 간단한 동작메서드 ###//
    public void addReviewImage(String imagePath) {
        reviewImages.add(ReviewImage.builder()
                        .imagePath(imagePath)
                        .review(this)
                        .build());
    }

    public void updateReviewImage(String imagePath) {
        deleteReviewImage();
        if (!imagePath.equals("")) {
            reviewImages.add(ReviewImage.builder()
                    .imagePath(imagePath)
                    .review(this)
                    .build());
        }
    }

    public void deleteReviewImage() {
        reviewImages.clear();
    }


    public void addReport(ReviewReport reviewReport) {
        if (isStoreUser(reviewReport.getUser())) { // 더 좋은 방법이 없을까요 (약사는 신고 +3)
            reviewReports.add(ReviewReport.builder()
                    .reportStatus(REGISTERED)
                    .review(this)
                    .build());
            reviewReports.add(ReviewReport.builder()
                    .reportStatus(REGISTERED)
                    .review(this)
                    .build());
        }
        reviewReports.add(ReviewReport.builder()
                .reportStatus(REGISTERED)
                .review(this)
                .build());
    }

    private boolean isStoreUser(User user) {
        return user.getRole().equals("약국회원"); // 하드코딩 개선 필요!
    }

    public void changeReportStatus(ReportStatus reportStatus) {
        this.reviewReports.stream()
                .filter(report -> report.getModifiedAt().isEqual(report.getCreatedAt()))
                .forEach(report -> report.changeReportStatus(reportStatus));
    }


    // ###연관관계  편의 메서드 ###//

}
