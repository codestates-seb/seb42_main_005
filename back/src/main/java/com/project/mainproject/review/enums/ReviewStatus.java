package com.project.mainproject.review.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ReviewStatus {

    POSTED(0, "일반글"),
    BLINDED(1, "비밀글"),
    DELETED(2,"삭제글"),
    ;
    private int num;
    private String description;
}
