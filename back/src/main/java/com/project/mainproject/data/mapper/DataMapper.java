package com.project.mainproject.data.mapper;

import com.project.mainproject.data.dto.RequestInfoDto;
import com.project.mainproject.data.vo.RequestInfoVo;
import org.mapstruct.Mapper;
@Mapper(componentModel = "spring")
public interface DataMapper {
    default RequestInfoVo requestInfoDtoToRequestInfoVo(RequestInfoDto requestBody) {
        return RequestInfoVo.builder()
                .Q0(requestBody.getCity())
                .Q1(requestBody.getDistrict())
                .QT(String.valueOf(requestBody.getDayOfWeek().getWeekNum()))
                .QN(requestBody.getName())
                .pageNo(String.valueOf(requestBody.getPage()))
                .numOfRows(String.valueOf(requestBody.getSize()))
                .build();
    }

}
