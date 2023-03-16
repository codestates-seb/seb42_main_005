package com.project.mainproject.review.entity;

import com.project.mainproject.audit.AuditableWithBy;
import com.project.mainproject.review.enums.ReportStatus;
import com.project.mainproject.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name = "REPORT")
@NoArgsConstructor(access = PROTECTED)
public class Report extends AuditableWithBy {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long reportIdx;

    private String content;

    @Enumerated(value = STRING)
    private ReportStatus reportStatus;

    @ManyToOne(fetch = LAZY)
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "REVIEW_IDX")
    private Review review;

    //### 간단한 동작메서드 ###//

    // ###연관관계  편의 메서드 ###//

}
