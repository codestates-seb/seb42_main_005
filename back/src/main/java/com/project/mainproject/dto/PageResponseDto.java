package com.project.mainproject.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class PageResponseDto<T> {
    @Setter
    private T response;
    private PageInfo pageInfo;
    private String message;
    private int httpCode;

    @Builder
    protected PageResponseDto(T response, PageInfo pageInfo, String message, int httpCode) {
        this.response = response;
        this.pageInfo = pageInfo;
        this.message = message;
        this.httpCode = httpCode;
    }

    @Builder
    public PageResponseDto(PageInfo pageInfo, String message, int httpCode) {
        this.pageInfo = pageInfo;
        this.message = message;
        this.httpCode = httpCode;
    }
}
