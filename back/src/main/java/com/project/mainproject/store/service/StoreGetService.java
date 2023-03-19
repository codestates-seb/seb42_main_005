package com.project.mainproject.store.service;

import com.project.mainproject.dto.SliceResponseDto;
import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import com.project.mainproject.store.dto.GetStoreDetailDto;
import com.project.mainproject.store.dto.GetStoreSliceRequestDto;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.mapper.StoreMapper;
import com.project.mainproject.store.repository.StoreQueryRepository;
import com.project.mainproject.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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
    public SliceResponseDto getStoreSliceDto(GetStoreSliceRequestDto request, Pageable pageable) {
//        Slice<DBStoreSliceDto> storePage = storeRepository.getStoreSlice(request.getLat(), request.getLng(), request.getDistance(), pageable);
//
//        List<DBStoreSliceDto> content = storePage.getContent();
//
//        return SliceResponseDto.<List<DBStoreSliceDto>>builder()
//                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
//                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
//                .sliceInfo(SliceInfo.builder()
//                        .hasNext(storePage.hasNext())
//                        .number(storePage.getNumber())
//                        .isFirst(storePage.isFirst())
//                        .size(storePage.getSize())
//                        .isFinish(storePage.isFirst())
//                        .build())
//                .response(content)
//                .build();
        return null;
    }


}
