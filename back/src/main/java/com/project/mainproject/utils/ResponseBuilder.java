package com.project.mainproject.utils;

import com.project.mainproject.dto.PageInfo;
import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import static com.project.mainproject.enums.ResultStatus.CREATE_COMPLETED;
import static com.project.mainproject.enums.ResultStatus.PROCESS_COMPLETED;

@Component
public class ResponseBuilder<T, S> {

    public PageInfo pageInfoBuilder(Page<T> page) {
        return PageInfo.builder()
                .size(page.getSize())
                .page(page.getNumber())
                .totalElement(page.getTotalElements())
                .totalPage(page.getTotalPages())
                .isFirst(page.isFirst())
                .isFinish(page.isLast())
                .build();
    }

    public PageResponseDto<S> buildPageResponse(Page<T> pageData, S responseData) {
        return PageResponseDto.<S>builder()
                .httpCode(PROCESS_COMPLETED.getHttpCode())
                .message(PROCESS_COMPLETED.getMessage())
                .pageInfo(pageInfoBuilder(pageData))
                .response(responseData)
                .build();
    }

    public PageResponseDto buildPageResponse(Page<T> pageData) {
        return PageResponseDto.builder()
                .httpCode(PROCESS_COMPLETED.getHttpCode())
                .message(PROCESS_COMPLETED.getMessage())
                .pageInfo(pageInfoBuilder(pageData))
                .build();
    }

    public SingleResponseDto<T> buildSingleCreatedResponse(T responseData) {
        return SingleResponseDto.<T>builder()
                .response(responseData)
                .httpCode(CREATE_COMPLETED.getHttpCode())
                .message(CREATE_COMPLETED.getMessage())
                .build();
    }

    public SingleResponseDto<T> buildSingleOkResponse(T responseData) {
        return SingleResponseDto.<T>builder()
                .response(responseData)
                .httpCode(PROCESS_COMPLETED.getHttpCode())
                .message(PROCESS_COMPLETED.getMessage())
                .build();
    }

}
