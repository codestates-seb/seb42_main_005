package com.project.mainproject.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SingleResponseDto<T> {
    private T response;
    private String message;
    private int httpCode;

    @Builder
    public SingleResponseDto(T response, String message, int httpCode) {
        this.response = response;
        this.message = message;
        this.httpCode = httpCode;
    }
}


