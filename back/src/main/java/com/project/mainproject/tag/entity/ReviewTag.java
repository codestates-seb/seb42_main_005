package com.project.mainproject.tag.entity;

import com.project.mainproject.review.entity.Review;
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
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
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

}
