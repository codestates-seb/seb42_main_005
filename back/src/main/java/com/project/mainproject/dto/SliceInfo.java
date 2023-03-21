package com.project.mainproject.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SliceInfo {
    private int size;
    private int number;
    private Boolean isFirst;
    private Boolean isFinish;
    private Boolean hasNext;

}
