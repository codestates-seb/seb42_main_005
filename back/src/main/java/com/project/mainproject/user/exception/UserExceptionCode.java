package com.project.mainproject.user.exception;

import com.project.mainproject.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum UserExceptionCode implements ExceptionCode {
    USER_EXIST(HttpStatus.CONFLICT, "이미 존재하는 회원입니다."),
    USER_NOT_FOUND(HttpStatus.CONFLICT,"회원정보를 찾을 수 없습니다."),
    USER_NOT_PHARMACY(HttpStatus.CONFLICT,"약사가 아닙니다."),
    USER_IS_NOT_PHARMACY(HttpStatus.CONFLICT,"회원은 약사가 아닙니다."),
    PASSWORD_NOT_MATCHED(HttpStatus.NOT_ACCEPTABLE, "비밀번호가 틀립니다"),
    USER_NOT_NORMAL(HttpStatus.CONFLICT,"일반 회원이 아닙니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
