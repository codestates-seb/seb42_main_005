package com.project.mainproject.review.entity;

import com.project.mainproject.audit.Auditable;
import com.project.mainproject.review.enums.ReviewStatus;
import com.project.mainproject.tag.entity.Tag;
import com.project.mainproject.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name = "REVIEW")
@NoArgsConstructor(access = PROTECTED)
public class Review extends Auditable {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long reviewIdx;

    private String content;

    private int rating;

    @Formula("(SELECT count(1) FROM report r WHERE r.review_idx = review_idx)")
    private int reportCnt;

    @Enumerated(value = STRING)
    private ReviewStatus reviewStatus;

    @ManyToOne(fetch = LAZY)
    private User user;
    @ManyToOne(fetch = LAZY)
    private Tag tag;

    //### 간단한 동작메서드 ###//

    // ###연관관계  편의 메서드 ###//

}
