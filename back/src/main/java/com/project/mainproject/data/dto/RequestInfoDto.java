package com.project.mainproject.data.dto;

import com.project.mainproject.data.enums.DayOfTheWeek;
import lombok.Getter;

@Getter
public class RequestInfoDto extends RequestPageDto {

    private String city;
    private String district;
    private DayOfTheWeek dayOfWeek;
    private String name;

}
