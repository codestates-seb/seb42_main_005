package com.project.mainproject.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class SliceResponseDto<T> {
    @Setter
    private T response;
    private SliceInfo sliceInfo;
    private String message;
    private int httpCode;

    @Builder
    public SliceResponseDto(T response, SliceInfo sliceInfo, String message, int httpCode) {
        this.response = response;
        this.sliceInfo = sliceInfo;
        this.message = message;
        this.httpCode = httpCode;
    }

    @Builder
    public SliceResponseDto(SliceInfo sliceInfo, String message, int httpCode) {
        this.sliceInfo = sliceInfo;
        this.message = message;
        this.httpCode = httpCode;
    }
}
