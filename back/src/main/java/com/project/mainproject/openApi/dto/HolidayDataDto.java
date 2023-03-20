package com.project.mainproject.openApi.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class HolidayDataDto {
    private String dateName;
    private String locdate;
    private String isHoliday;
}
