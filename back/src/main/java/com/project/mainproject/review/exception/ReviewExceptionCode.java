package com.project.mainproject.review.exception;

import com.project.mainproject.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ReviewExceptionCode implements ExceptionCode {
    REVIEW_NOT_EXIST(HttpStatus.NOT_FOUND, "리뷰를 찾을 수 없습니다."),
    RATING_NOT_VALID(HttpStatus.BAD_REQUEST, "별점은 0점에서 5점 사이여야 합니다."),
    REVIEW_NOT_BLINDED(HttpStatus.BAD_REQUEST, "블라인드 처리된 리뷰가 아닙니다."),

    ;

    private final HttpStatus httpStatus;
    private final String message;
}
