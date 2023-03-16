package com.project.mainproject.review.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name = "REVIEW_IMAGE")
@NoArgsConstructor(access = PROTECTED)
public class ReviewImage {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long reviewImageIdx;

    private String imagePath;

    //### 간단한 동작메서드 ###//

    // ###연관관계  편의 메서드 ###//
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "REVIEW_IDX")
    private Review review;

}
