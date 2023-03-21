package com.project.mainproject.data.vo;

import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class RequestInfoVo extends RequestPageVo {

    private String Q0;
    private String Q1;
    private String QT;
    private String QN;

}
