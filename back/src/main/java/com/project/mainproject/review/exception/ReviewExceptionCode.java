package com.project.mainproject.review.exception;

import com.project.mainproject.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ReviewExceptionCode implements ExceptionCode {
    REVIEW_NOT_EXIST(HttpStatus.NOT_FOUND, "리뷰를 찾을 수 없습니다."),

    ;

    private final HttpStatus httpStatus;
    private final String message;
}
