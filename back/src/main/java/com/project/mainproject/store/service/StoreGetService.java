package com.project.mainproject.store.service;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.enums.ResultStatus;
import com.project.mainproject.openApi.entity.HolidayData;
import com.project.mainproject.redis.repository.RedisRepository;
import com.project.mainproject.store.dto.DBdto.DBPickedStoredListDto;
import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import com.project.mainproject.store.dto.DBdto.DBStoreListDto;
import com.project.mainproject.store.dto.DBdto.DBStoreSearchDto;
import com.project.mainproject.store.dto.GetStoreDetailDto;
import com.project.mainproject.store.dto.GetStoreListRequestDto;
import com.project.mainproject.store.mapper.StoreMapper;
import com.project.mainproject.store.repository.StoreQueryRepository;
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
    private final StoreQueryRepository storeQueryRepository;
    private final StoreMapper storeMapper;
    private final RedisRepository redisRepository;


    /*
    * 약국 상세 정보 stub o
    * */
    public SingleResponseDto getStoreDetailDto(Long storeIdx,Long userIdx) {
        DBStoreDetailDto findDetailDto = storeQueryRepository.findData(storeIdx,userIdx);
        log.info("### findDetailDto = {}", findDetailDto);
        GetStoreDetailDto responseDto = storeMapper.getStoreDetailDto(findDetailDto);

        return SingleResponseDto.<GetStoreDetailDto>builder().response(responseDto).message(ResultStatus.PROCESS_COMPLETED.getMessage()).httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode()).build();
    }

    /*
    * 거리기준 랭킹기준 찜 기준 stub o
    * */
    public SingleResponseDto getStoreListDto(GetStoreListRequestDto request, Long userIdx) {
        Boolean isHoliday = getIsHoliday();
        double maxLat = Math.max(request.getSwLat(), request.getNeLat());
        double minLat = Math.min(request.getSwLat(), request.getNeLat());
        double maxLng = Math.max(request.getSwLng(), request.getNeLng());
        double minLng = Math.min(request.getSwLng(), request.getNeLng());

        List<DBStoreListDto> findStores = storeQueryRepository.getStoreList(maxLat,minLat,maxLng,minLng, request.getLat(), request.getLng(),request.getSortCondition(),request.getFilterCondition(),isHoliday,userIdx);


        return SingleResponseDto
                .<List<DBStoreListDto>>builder()
                .response(findStores)
                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .build();
    }

    /*
    * 찜한 약국 리스트 보내주는 메서드 stub o
    * */
    public SingleResponseDto getPickedStoreList(Long userIdx) {
        List<DBPickedStoredListDto> findPickedList = storeQueryRepository.getPickedStoreList(userIdx);
        return SingleResponseDto.<List<DBPickedStoredListDto>>builder()
                .response(findPickedList)
                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .build();
    }

    /*
     * 검색한 약국 리스트 보내주는 메서드 stub o
     * */
    public SingleResponseDto getSearchStoreList(String keyword) {
        List<DBStoreSearchDto> responseName = storeQueryRepository.searchStoreByName(keyword);
        List<DBStoreSearchDto> responseAddress = storeQueryRepository.searchStoreByAddress(keyword);

        responseName.addAll(responseAddress);

        return SingleResponseDto.<List<DBStoreSearchDto>>builder()
                .response(responseName)
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
