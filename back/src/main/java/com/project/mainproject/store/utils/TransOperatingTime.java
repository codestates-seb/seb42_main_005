package com.project.mainproject.store.utils;

import com.project.mainproject.VO.OperatingTime;
import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import com.project.mainproject.store.dto.OperatingDayOfWeekDto;
import com.project.mainproject.store.entity.Store;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Component
public class TransOperatingTime {
    public OperatingTime todayOperating(DBStoreDetailDto dBStoreDetailDto) {

        DayOfWeek dayOfWeek = LocalDate.now().getDayOfWeek();
        switch (dayOfWeek) {
            case MONDAY:
                return dBStoreDetailDto.getMonday() == null ? new OperatingTime(null, null) : dBStoreDetailDto.getMonday();
            case TUESDAY:
                return dBStoreDetailDto.getTuesday() == null ? new OperatingTime(null, null) : dBStoreDetailDto.getTuesday();
            case WEDNESDAY:
                return dBStoreDetailDto.getWednesday() == null ? new OperatingTime(null, null) : dBStoreDetailDto.getWednesday();
            case THURSDAY:
                return dBStoreDetailDto.getThursday() == null ? new OperatingTime(null, null) : dBStoreDetailDto.getThursday();
            case FRIDAY:
                return dBStoreDetailDto.getFriday() == null ? new OperatingTime(null, null) : dBStoreDetailDto.getFriday();
            case SATURDAY:
                return dBStoreDetailDto.getSaturday() == null ? new OperatingTime(null, null) : dBStoreDetailDto.getSaturday();
            case SUNDAY:
                return dBStoreDetailDto.getSunday() == null ? new OperatingTime(null, null) : dBStoreDetailDto.getSunday();
            default:
                return dBStoreDetailDto.getHoliday() == null ? new OperatingTime(null, null) : dBStoreDetailDto.getHoliday();
        }
    }
    public OperatingTime todayOperating(Store store) {

        DayOfWeek dayOfWeek = LocalDate.now().getDayOfWeek();
        switch (dayOfWeek) {
            case MONDAY:
                return store.getMondayOperating() == null ? new OperatingTime(null, null) : store.getMondayOperating();
            case TUESDAY:
                return store.getTuesdayOperating() == null ? new OperatingTime(null, null) : store.getTuesdayOperating();
            case WEDNESDAY:
                return store.getWednesdayOperating() == null ? new OperatingTime(null, null) : store.getWednesdayOperating();
            case THURSDAY:
                return store.getThursdayOperating() == null ? new OperatingTime(null, null) : store.getThursdayOperating();
            case FRIDAY:
                return store.getFridayOperating() == null ? new OperatingTime(null, null) : store.getFridayOperating();
            case SATURDAY:
                return store.getSaturdayOperating() == null ? new OperatingTime(null, null) : store.getSaturdayOperating();
            case SUNDAY:
                return store.getSundayOperating() == null ? new OperatingTime(null, null) : store.getSundayOperating();
            default:
                return store.getHolidayOperating() == null ? new OperatingTime(null, null) : store.getHolidayOperating();
        }
    }

    public LocalTime stringToLocalTime(String str) {
        if (str == null) return null;
        StringBuilder sb = new StringBuilder(str);
        sb.insert(2, ":");
        int hour = Integer.parseInt(sb.substring(0, 2));
        if (hour > 23) sb.replace(0, 2, "0" + (hour - 24));
        return LocalTime.parse(sb.toString());
    }

    public OperatingDayOfWeekDto transFromDBDataToResponseData(DBStoreDetailDto dbStoreDetailDto) {
        return OperatingDayOfWeekDto.builder().monday(Optional.ofNullable(dbStoreDetailDto.getMonday()).orElse(new OperatingTime(null, null)))
                .tuesday(Optional.ofNullable(dbStoreDetailDto.getTuesday()).orElse(null))
                .wednesday(Optional.ofNullable(dbStoreDetailDto.getWednesday()).orElse(null))
                .thursday(Optional.ofNullable(dbStoreDetailDto.getThursday()).orElse(null))
                .friday(Optional.ofNullable(dbStoreDetailDto.getFriday()).orElse(null))
                .saturday(Optional.ofNullable(dbStoreDetailDto.getSaturday()).orElse(null))
                .sunday(Optional.ofNullable(dbStoreDetailDto.getSunday()).orElse(null))
                .holiday(Optional.ofNullable(dbStoreDetailDto.getHoliday()).orElse(null))
                .build();
    }
    public OperatingDayOfWeekDto transFromDBDataToResponseData(Store store) {
        return OperatingDayOfWeekDto.builder()
                .monday(Optional.ofNullable(store.getMondayOperating()).orElse(null))
                .tuesday(Optional.ofNullable(store.getTuesdayOperating()).orElse(null))
                .wednesday(Optional.ofNullable(store.getWednesdayOperating()).orElse(null))
                .thursday(Optional.ofNullable(store.getThursdayOperating()).orElse(null))
                .friday(Optional.ofNullable(store.getFridayOperating()).orElse(null))
                .saturday(Optional.ofNullable(store.getSaturdayOperating()).orElse(null))
                .sunday(Optional.ofNullable(store.getSundayOperating()).orElse(null))
                .holiday(Optional.ofNullable(store.getHolidayOperating()).orElse(null))
                .build();
    }
}
