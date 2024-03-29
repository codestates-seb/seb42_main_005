package com.project.mainproject.review.entity;

import com.project.mainproject.audit.AuditableWithBy;
import com.project.mainproject.review.enums.ReportStatus;
import com.project.mainproject.user.entity.User;
import lombok.*;
import lombok.Builder.Default;

import javax.persistence.*;

import static com.project.mainproject.review.enums.ReportStatus.REGISTERED;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
public class ReviewReport extends AuditableWithBy {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "REVIEW_REPORT_IDX")
    private Long reportIdx;

    @Default
    private String content = "";

    @Default
    @Enumerated(value = STRING)
    private ReportStatus reportStatus = REGISTERED;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_IDX")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "REVIEW_IDX")
    private Review review;

    @Builder
    public ReviewReport(String content, User user, Review review) {
        this.content = content;
        this.user = user;
        this.review = review;
        this.reportStatus = REGISTERED;
    }

    //### 간단한 동작메서드 ###//
    public void changeReportStatus(ReportStatus reportStatus) {
        this.reportStatus = reportStatus;
    }

    // ###연관관계  편의 메서드 ###//

}
