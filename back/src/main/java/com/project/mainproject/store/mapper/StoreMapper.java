package com.project.mainproject.store.mapper;

import com.project.mainproject.data.dto.StoreDataDto;
import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import com.project.mainproject.store.dto.GetStoreDetailDto;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.utils.TransOperatingTime;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class StoreMapper {
    protected final TransOperatingTime transOperatingTime = new TransOperatingTime();

    @Mapping(target = "operatingTime", expression = "java(transOperatingTime.transFromDBDataToResponseData(dbStoreDetailDto))")
    @Mapping(target = "isOperating",expression = "java(transOperatingTime.todayOperating(dbStoreDetailDto).checkOperating())")
    @Mapping(target = "isOperatingNight",expression = "java(transOperatingTime.todayOperating(dbStoreDetailDto).isNightOperating())")
    @Mapping(target = "todayOperatingTime.operatingTime" , expression ="java(transOperatingTime.todayOperating(dBStoreDetailDto))")
    public abstract GetStoreDetailDto getStoreDetailDto(DBStoreDetailDto dbStoreDetailDto);


    @Mapping(target = "isOperatingNight",expression = "java(transOperatingTime.todayOperating(store).isNightOperating())")
    @Mapping(target = "isOperating",expression = "java(transOperatingTime.todayOperating(store).checkOperating())")
    @Mapping(target = "operatingTime", expression = "java(transOperatingTime.transFromDBDataToResponseData(store))")
    @Mapping(target = "todayOperatingTime.operatingTime" , expression ="java(transOperatingTime.todayOperating(store))")
    @Mapping(target = "imagePath",expression = "java(store.getStoreImagePath())")
    @Mapping(target = "reviewCount", expression ="java(store.getReviewCount())" )
    @Mapping(target = "pickedStoreCount", expression = "java(store.getPickedStoreCount())")
    @Mapping(target = "rating", expression="java(store.getRatingAvg())")
    public abstract GetStoreDetailDto getStoreDetailDto(Store store);


    public abstract List<Store> storeDataDtoListToStores(List<StoreDataDto> storeData);

    @Mapping(target = "mondayOperating.startTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime1s()))")
    @Mapping(target = "mondayOperating.endTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime1c()))")
    @Mapping(target = "tuesdayOperating.startTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime1s()))")
    @Mapping(target = "tuesdayOperating.endTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime1c()))")
    @Mapping(target = "wednesdayOperating.startTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime3s()))")
    @Mapping(target = "wednesdayOperating.endTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime3c()))")
    @Mapping(target = "thursdayOperating.startTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime4s()))")
    @Mapping(target = "thursdayOperating.endTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime4c()))")
    @Mapping(target = "fridayOperating.startTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime5s()))")
    @Mapping(target = "fridayOperating.endTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime5c()))")
    @Mapping(target = "saturdayOperating.startTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime6s()))")
    @Mapping(target = "saturdayOperating.endTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime6c()))")
    @Mapping(target = "sundayOperating.startTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime7s()))")
    @Mapping(target = "sundayOperating.endTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime7c()))")
    @Mapping(target = "holidayOperating.startTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime8s()))")
    @Mapping(target = "holidayOperating.endTime",
            expression = "java(transOperatingTime.stringToLocalTime(storeDataDto.getDutyTime8c()))")
    @Mapping(target = "isOperatingHoliday",
            expression = "java(storeDataDto.getDutyTime8s() != null ? true : false)")
    @Mapping(target = "address", source = "dutyAddr")
    @Mapping(target = "longitude", source = "wgs84Lon")
    @Mapping(target = "latitude", source = "wgs84Lat")
    @Mapping(target = "tel", source = "dutyTel1")
    @Mapping(target = "etc", source = "dutyEtc")
    @Mapping(target = "name", source = "dutyName")
    public abstract Store storeDataDtoToStore(StoreDataDto storeDataDto);

}
