package com.project.mainproject.store.mapper;

import com.project.mainproject.data.dto.StoreDataDto;
import com.project.mainproject.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.time.LocalTime;
import java.util.List;
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface StoreMapper {
    List<Store> storeDataDtoListToStores(List<StoreDataDto> storeData);

    @Mapping(target = "mondayOperating.startTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime1s()))")
    @Mapping(target = "mondayOperating.endTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime1c()))")
    @Mapping(target = "tuesdayOperating.startTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime1s()))")
    @Mapping(target = "tuesdayOperating.endTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime1c()))")
    @Mapping(target = "wednesdayOperating.startTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime3s()))")
    @Mapping(target = "wednesdayOperating.endTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime3c()))")
    @Mapping(target = "thursdayOperating.startTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime4s()))")
    @Mapping(target = "thursdayOperating.endTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime4c()))")
    @Mapping(target = "fridayOperating.startTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime5s()))")
    @Mapping(target = "fridayOperating.endTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime5c()))")
    @Mapping(target = "saturdayOperating.startTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime6s()))")
    @Mapping(target = "saturdayOperating.endTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime6c()))")
    @Mapping(target = "sundayOperating.startTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime7s()))")
    @Mapping(target = "sundayOperating.endTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime7c()))")
    @Mapping(target = "holidayOperating.startTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime8s()))")
    @Mapping(target = "holidayOperating.endTime",
            expression = "java(stringToLocalTime(storeDataDto.getDutyTime8c()))")
    @Mapping(target = "isOperatingHoliday",
            expression = "java(storeDataDto.getDutyTime8s() != null ? true : false)")
    @Mapping(target = "address", source = "dutyAddr")
    @Mapping(target = "longitude", source = "wgs84Lon")
    @Mapping(target = "latitude", source = "wgs84Lat")
    @Mapping(target = "tel", source = "dutyTel1")
    @Mapping(target = "etc", source = "dutyEtc")
    @Mapping(target = "name", source = "dutyName")
    Store storeDataDtoToStore(StoreDataDto storeDataDto);

    default LocalTime stringToLocalTime(String str) {
        if (str == null) return null;
        StringBuilder sb = new StringBuilder(str);
        sb.insert(2, ":");
        int hour = Integer.parseInt(sb.substring(0,2));
        if (hour > 23) sb.replace(0,2, "0" + (hour - 24));
        return LocalTime.parse(sb.toString());
    }

}
