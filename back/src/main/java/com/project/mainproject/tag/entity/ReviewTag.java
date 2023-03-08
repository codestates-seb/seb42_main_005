package com.project.mainproject.tag.entity;

import com.project.mainproject.review.entity.Review;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@Getter
public class ReviewTag {
    @Id
    @GeneratedValue
    private Long tagIdx;

    @ManyToOne
    private Tag tag;

    @ManyToOne
    private Review review;
}
