package com.project.mainproject.data.vo;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class RequestPageVo {

    private String pageNo;
    private String numOfRows;

}
