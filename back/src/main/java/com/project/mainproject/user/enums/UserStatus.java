package com.project.mainproject.user.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum UserStatus {

    ACTIVE(0, "활동 회원"),
    SUSPENDED(1,"정지 회원"),
    KICKEDOUT(2,"강퇴 회원"),
    WITHDRAWN(3,"탈퇴 회원")
    ;
    ;

    private int num;

    private String description;

}
