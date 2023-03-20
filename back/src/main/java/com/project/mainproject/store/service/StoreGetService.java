package com.project.mainproject.store.service;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.enums.ResultStatus;
import com.project.mainproject.openApi.entity.HolidayData;
import com.project.mainproject.redis.repository.RedisRepository;
import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import com.project.mainproject.store.dto.DBdto.DBStoreListDto;
import com.project.mainproject.store.dto.GetStoreDetailDto;
import com.project.mainproject.store.dto.GetStoreListRequestDto;
import com.project.mainproject.store.mapper.StoreMapper;
import com.project.mainproject.store.repository.StoreQueryRepository;
import com.project.mainproject.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StoreGetService {
    private final StoreRepository storeRepository;
    private final StoreQueryRepository storeQueryRepository;
    private final StoreValidService storeValidService;
    private final StoreMapper storeMapper;
    private final RedisRepository redisRepository;

    public SingleResponseDto getStoreDetailDto(Long storeIdx) {
//        DBStoreDetailDto findDetailDto = storeQueryRepository.findData(storeIdx);
        DBStoreDetailDto findDetailDto = storeQueryRepository.findData(storeIdx);
        log.info("### findDetailDto = {}", findDetailDto);
        GetStoreDetailDto responseDto = storeMapper.getStoreDetailDto(findDetailDto);

        return SingleResponseDto.<GetStoreDetailDto>builder().response(responseDto).message(ResultStatus.PROCESS_COMPLETED.getMessage()).httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode()).build();
    }

    /*
    * 거리기준으로 필터링 할 때 출력되는 데이터
    * */
    public SingleResponseDto getStoreListDto(GetStoreListRequestDto request) {
        Boolean isHoliday = getIsHoliday();
        List<DBStoreListDto> findStores = storeQueryRepository.getStoreList(request.getLat(), request.getLng(), request.getDistance(), request.getSortCondition(),request.getFilterCondition(),isHoliday);

        return SingleResponseDto
                .<List<DBStoreListDto>>builder()
                .response(findStores)
                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .build();
    }


    //내부 동작 메서드
    private Boolean getIsHoliday() {
        Optional<HolidayData> findHoliday = redisRepository.findById(LocalDate.now().toString());
        Boolean isHoliday = false;
        if (findHoliday.isPresent()) {
            isHoliday = true;
        }
        return isHoliday;
    }


}
