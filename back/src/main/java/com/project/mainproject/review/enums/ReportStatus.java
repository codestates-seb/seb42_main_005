package com.project.mainproject.review.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ReportStatus {

    REGISTERED(0, "처리 전"),
    REJECTED(1,"처리 반려"),
    SUCCESS(2,"처리 완료")
    ;

    private int num;

    private String description;

}
