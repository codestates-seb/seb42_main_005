package com.project.mainproject.store.mapper;

import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import com.project.mainproject.store.dto.GetStoreDetailDto;
import com.project.mainproject.store.utils.TransOperatingTime;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
@RequiredArgsConstructor
public abstract class StoreMapper {
    TransOperatingTime transOperatingTime;

    @Mapping(target = "operatingTime", source = ".")
    @Mapping(target = "isOperating",expression = "java(transOperatingTime.todayOperating(dbStoreDetailDto).checkOperating())")
    @Mapping(target = "isOperatingNight",expression = "java(transOperatingTime.todayOperating(dbStoreDetailDto).isNightOperating())")
    @Mapping(target = "todayOperatingTime.operatingTime" , expression ="java(transOperatingTime.todayOperating(dBStoreDetailDto))")
    public abstract GetStoreDetailDto getStoreDetailDto(DBStoreDetailDto dbStoreDetailDto);



}
