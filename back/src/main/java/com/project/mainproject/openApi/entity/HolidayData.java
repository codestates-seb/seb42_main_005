package com.project.mainproject.openApi.entity;

import com.project.mainproject.openApi.dto.HolidayDataDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import javax.persistence.Id;


@Getter
@RedisHash(value = "holidayData", timeToLive = 110)
@NoArgsConstructor
@ToString
public class HolidayData {
    @Id
    private String id;
    @Indexed
    private String date;
    private String dateName;

    private String isHoliday;


    public HolidayData(HolidayDataDto holidayDataDto) {
        this.id = holidayDataDto.getLocdate();
        this.date = holidayDataDto.getLocdate();
        this.dateName = holidayDataDto.getDateName();
        this.isHoliday = holidayDataDto.getIsHoliday();
    }
}
