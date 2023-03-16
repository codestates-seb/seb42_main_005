package com.project.mainproject.tag.entity;

import com.project.mainproject.review.entity.Review;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Builder
public class ReviewTag {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long reviewTagIdx;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "TAG_IDX")
    private Tag tag;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "REVIEW_IDX")
    private Review review;

    public void setReview(Review review) {
        this.review = review;
        if (!this.review.getReviewTags().contains(this)) {
            this.review.getReviewTags().add(this);
        }
    }
}
