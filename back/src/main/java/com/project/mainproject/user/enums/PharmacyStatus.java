package com.project.mainproject.user.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum PharmacyStatus {

    REGISTERED(0, "처리 전"),
    REJECTED(1,"처리 반려"),
    SUCCESS(2,"처리 완료")
    ;

    private int num;

    private String description;
}
