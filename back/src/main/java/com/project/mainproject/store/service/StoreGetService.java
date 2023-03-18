package com.project.mainproject.store.service;

import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import com.project.mainproject.store.dto.GetStoreDetailDto;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.mapper.StoreMapper;
import com.project.mainproject.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreGetService {
    private final StoreRepository storeRepository;
    private final StoreValidService storeValidService;
    private final StoreMapper storeMapper;

    public GetStoreDetailDto getStoreDetailDto(Long storeIdx) {
        Store findStore = storeValidService.storeValidation(storeIdx);
        DBStoreDetailDto findDetailDto = storeRepository.findData(storeIdx);

        log.info("findDetailDto = {}", findDetailDto);

        GetStoreDetailDto responseDto = storeMapper.getStoreDetailDto(findDetailDto);
        return responseDto;
    }


}
