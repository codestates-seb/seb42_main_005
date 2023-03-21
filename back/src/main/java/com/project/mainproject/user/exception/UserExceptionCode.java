package com.project.mainproject.user.exception;

import com.project.mainproject.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum UserExceptionCode implements ExceptionCode {
    USER_EXIST(HttpStatus.CONFLICT, "회원이 존재합니다."),
    USER_NOT_FOUND(HttpStatus.CONFLICT,"회원이 존재하지 않습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
