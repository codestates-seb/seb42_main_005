package com.project.mainproject.review.entity;

import com.project.mainproject.audit.Auditable;
import com.project.mainproject.review.enums.ReviewStatus;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.tag.entity.ReviewTag;
import com.project.mainproject.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.REMOVE;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
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

    @Formula("(SELECT count(1) FROM report r WHERE r.review_idx = review_idx)")
    private int reportCnt;

    @Builder.Default
    @Enumerated(value = STRING)
    private ReviewStatus reviewStatus = ReviewStatus.POSTED;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_IDX")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "STORE_IDX")
    private Store store;

    @OneToMany(mappedBy = "review", fetch = LAZY, cascade = REMOVE)
    private List<ReviewTag> reviewTags = new ArrayList<>();

    @OneToMany(mappedBy = "review", fetch = LAZY, cascade = REMOVE)
    private List<ReviewImage> reviewImages = new ArrayList<>();

    //### 간단한 동작메서드 ###//

    // ###연관관계  편의 메서드 ###//
    public void setReviewImages(ReviewImage reviewImage) {
        this.reviewImages.add(reviewImage);
        if (reviewImage.getReview() != this) {
            reviewImage.setReview(this);
        }
    }

}
