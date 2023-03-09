package com.project.mainproject.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Getter
@AllArgsConstructor
public enum ResultStatus {
    MEMBER_NOT_FOUND(NOT_FOUND, "Member Not Found"),
    MEMBER_EXIST(CONFLICT, "Member is already Exist!"),
    MEMBER_JWT_EXIST(CONFLICT, "JWT Registry Member is Exist")
    // TODO : 추가
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
