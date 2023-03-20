package com.project.mainproject.store.service;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.enums.ResultStatus;
import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import com.project.mainproject.store.dto.DBdto.DBStoreListDto;
import com.project.mainproject.store.dto.GetStoreDetailDto;
import com.project.mainproject.store.dto.GetStoreListRequestDto;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.mapper.StoreMapper;
import com.project.mainproject.store.repository.StoreQueryRepository;
import com.project.mainproject.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreGetService {
    private final StoreRepository storeRepository;
    private final StoreQueryRepository storeQueryRepository;
    private final StoreValidService storeValidService;
    private final StoreMapper storeMapper;


    public GetStoreDetailDto getStoreDetailDto(Long storeIdx) {
        Store findStore = storeValidService.storeValidation(storeIdx);
        DBStoreDetailDto findDetailDto = storeQueryRepository.findData(storeIdx);

        GetStoreDetailDto responseDto = storeMapper.getStoreDetailDto(findDetailDto);
        return responseDto;
    }

    /*
    * 거리기준으로 필터링 할 때 출력되는 데이터
    * */
    public SingleResponseDto getStoreSliceDto(GetStoreListRequestDto request) {
        List<DBStoreListDto> findStores = storeQueryRepository.getStoreList(request.getLat(), request.getLng(), request.getDistance(), request.getSortCondition());
        return SingleResponseDto
                .<List<DBStoreListDto>>builder()
                .response(findStores)
                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .build();
    }


}
