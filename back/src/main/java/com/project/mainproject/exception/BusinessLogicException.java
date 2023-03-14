package com.project.mainproject.exception;

import lombok.Getter;
import org.springframework.validation.BindingResult;

@Getter
public class BusinessLogicException extends RuntimeException {
    ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }

    public int getHttpCode() {

        return this.exceptionCode.getHttpStatus().value();
    }

    public String getReason() {

        return this.exceptionCode.getMessage();
    }
}
