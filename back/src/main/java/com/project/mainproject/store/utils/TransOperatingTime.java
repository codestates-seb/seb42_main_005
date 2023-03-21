package com.project.mainproject.store.utils;

import com.project.mainproject.VO.OperatingTime;
import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

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

    public LocalTime stringToLocalTime(String str) {
        if (str == null) return null;
        StringBuilder sb = new StringBuilder(str);
        sb.insert(2, ":");
        int hour = Integer.parseInt(sb.substring(0,2));
        if (hour > 23) sb.replace(0,2, "0" + (hour - 24));
        return LocalTime.parse(sb.toString());
    }

}
