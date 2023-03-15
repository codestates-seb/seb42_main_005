package com.project.mainproject.data.controller;

import com.project.mainproject.data.dto.RequestDetailDto;
import com.project.mainproject.data.dto.RequestInfoDto;
import com.project.mainproject.data.dto.RequestLocationDto;
import com.project.mainproject.data.dto.RequestPageDto;
import com.project.mainproject.data.mapper.DataMapper;
import com.project.mainproject.data.service.DataService;
import com.project.mainproject.data.vo.RequestInfoVo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/data")
public class DataController {
    private final DataService dataService;
    private final DataMapper dataMapper;

    public DataController(DataService dataService, DataMapper dataMapper) {
        this.dataService = dataService;
        this.dataMapper = dataMapper;
    }

    @GetMapping("/info")
    public void getStoreInfoData(@RequestBody RequestInfoDto requestBody) {
        RequestInfoVo params = dataMapper.requestInfoDtoToRequestInfoVo(requestBody);
        dataService.getInfoData(params);
    }

    @GetMapping("/location")
    public void getStoreLocationData(@RequestBody RequestLocationDto requestBody) {

    }

    @GetMapping("/detail")
    public void getStoreDetailData(@RequestBody RequestDetailDto requestBody) {

    }

    @GetMapping("/full")
    public void getStoreFullData(@RequestBody RequestPageDto requestBody) {

    }

}
