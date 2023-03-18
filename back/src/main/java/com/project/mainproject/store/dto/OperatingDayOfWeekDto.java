package com.project.mainproject.store.dto;

import com.project.mainproject.VO.OperatingTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OperatingDayOfWeekDto {
    private OperatingTime monday;
    private OperatingTime tuesday;
    private OperatingTime wednesday;
    private OperatingTime thursday;
    private OperatingTime friday;
    private OperatingTime saturday;
    private OperatingTime sunday;
    private OperatingTime holiday;
}
