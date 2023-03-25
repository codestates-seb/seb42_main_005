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
                return dBStoreDetailDto.getMonday() == null ? new OperatingTime(null, null) :  dBStoreDetailDto.getMonday();
            case TUESDAY:
                return dBStoreDetailDto.getTuesday() == null ? new OperatingTime(null, null) :  dBStoreDetailDto.getTuesday();
            case WEDNESDAY:
                return dBStoreDetailDto.getWednesday() == null ? new OperatingTime(null, null) :  dBStoreDetailDto.getWednesday();
            case THURSDAY:
                return dBStoreDetailDto.getThursday() == null ? new OperatingTime(null, null) :  dBStoreDetailDto.getThursday();
            case FRIDAY:
                return dBStoreDetailDto.getFriday() == null ? new OperatingTime(null, null) :  dBStoreDetailDto.getFriday();
            case SATURDAY:
                return dBStoreDetailDto.getSaturday() == null ? new OperatingTime(null, null) :  dBStoreDetailDto.getSaturday();
            case SUNDAY:
                return dBStoreDetailDto.getSunday() == null ? new OperatingTime(null, null) :  dBStoreDetailDto.getSunday();
            default:
                return dBStoreDetailDto.getHoliday() == null ? new OperatingTime(null, null) :  dBStoreDetailDto.getHoliday();
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
