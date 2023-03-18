package com.project.mainproject.store.utils;

import com.project.mainproject.VO.OperatingTime;
import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Component
public class TransOperatingTime {
    public OperatingTime todayOperating(DBStoreDetailDto dBStoreDetailDto) {
        DayOfWeek dayOfWeek = LocalDate.now().getDayOfWeek();
        switch (dayOfWeek) {
            case MONDAY:
                return dBStoreDetailDto.getMonday();
            case TUESDAY:
                return dBStoreDetailDto.getThursday();
            case WEDNESDAY:
                return dBStoreDetailDto.getWednesday();
            case THURSDAY:
                return dBStoreDetailDto.getTuesday();
            case FRIDAY:
                return dBStoreDetailDto.getFriday();
            case SATURDAY:
                return dBStoreDetailDto.getSaturday();
            case SUNDAY:
                return dBStoreDetailDto.getSunday();
            default:
                return dBStoreDetailDto.getHoliday();
        }
    }


}
