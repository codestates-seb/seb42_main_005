package com.project.mainproject.dummy;

import com.project.mainproject.dto.PageInfo;
import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;

import static com.project.mainproject.enums.ResultStatus.PROCESS_COMPLETED;

public class
CommonStub {
    public static PageInfo getPageInfoStub() {
        return PageInfo.builder()
                .page(0)
                .size(10)
                .totalPage(100)
                .totalElement(1000)
                .isFinish(false)
                .isFirst(true)
                .build();
    }

    public static SingleResponseDto getSingleResponseStub() {
        return SingleResponseDto.builder()
                .message(PROCESS_COMPLETED.getMessage())
                .httpCode(PROCESS_COMPLETED.getHttpCode())
                .build();
    }

    public static PageResponseDto getPageResponseStub() {
        return PageResponseDto.builder()
                .message(PROCESS_COMPLETED.getMessage())
                .httpCode(PROCESS_COMPLETED.getHttpCode())
                .pageInfo(getPageInfoStub())
                .build();
    }
}
