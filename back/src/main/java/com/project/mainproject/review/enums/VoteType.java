package com.project.mainproject.review.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum VoteType {

    LIKE(1, "추천"),
    HATE(2,"비추천"),
    ;
    private int num;
    private String description;

}
