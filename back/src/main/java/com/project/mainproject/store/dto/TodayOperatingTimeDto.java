package com.project.mainproject.store.dto;

import com.project.mainproject.VO.OperatingTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TodayOperatingTimeDto {
    private OperatingTime operatingTime;
}
