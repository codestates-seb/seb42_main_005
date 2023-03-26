package com.project.mainproject.stub;

import com.project.mainproject.dto.PageInfo;
import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.enums.ResultStatus;
import org.springframework.http.HttpStatus;

import static com.project.mainproject.enums.ResultStatus.PROCESS_COMPLETED;

public class CommonStub {

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

    public static SingleResponseDto getSingleResponseStub(ResultStatus resultStatus) {
        return SingleResponseDto.builder()
                .message(resultStatus.getMessage())
                .httpCode(resultStatus.getHttpCode())
                .build();
    }

    public static PageResponseDto getPageResponseStub(ResultStatus resultStatus) {
        return PageResponseDto.builder()
                .message(resultStatus.getMessage())
                .httpCode(resultStatus.getHttpCode())
                .pageInfo(getPageInfoStub())
                .build();
    }
}
