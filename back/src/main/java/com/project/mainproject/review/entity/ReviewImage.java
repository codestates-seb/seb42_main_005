package com.project.mainproject.review.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Builder
@Table(name = "REVIEW_IMAGE")
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
public class ReviewImage {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long reviewImageIdx;

    private String imagePath;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "REVIEW_IDX")
    private Review review;

    //### 간단한 동작메서드 ###//

    // ###연관관계  편의 메서드 ###//
    public void setReview(Review review) {
        this.review = review;
        if (!this.review.getReviewImages().contains(this)) {
            this.review.getReviewImages().add(this);
        }
    }

}
