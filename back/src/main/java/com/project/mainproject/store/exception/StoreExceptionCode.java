package com.project.mainproject.store.exception;

import com.project.mainproject.exception.ExceptionCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum StoreExceptionCode implements ExceptionCode {
    STORE_NOT_FOUND(HttpStatus.NOT_FOUND, "약국이 존재하지 않습니다."),
    STORE_NAME_NOT_FOUND(HttpStatus.NOT_FOUND, "약국명 확인이 필요합니다."),
    STORE_ADDRESS_NOT_FOUND(HttpStatus.NOT_FOUND, "약국 주소 확인이 필요합니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
