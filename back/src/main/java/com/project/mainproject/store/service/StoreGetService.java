package com.project.mainproject.store.service;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.enums.ResultStatus;
import com.project.mainproject.openApi.entity.HolidayData;
import com.project.mainproject.redis.repository.RedisRepository;
import com.project.mainproject.store.dto.DBdto.DBPickedStoredListDto;
import com.project.mainproject.store.dto.DBdto.DBStoreListDto;
import com.project.mainproject.store.dto.DBdto.DBStoreSearchDto;
import com.project.mainproject.store.dto.GetStoreDetailDto;
import com.project.mainproject.store.dto.GetStoreListRequestDto;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.mapper.StoreMapper;
import com.project.mainproject.store.repository.StoreQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;


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
        Store store = storeQueryRepository.findData(storeIdx);

        log.info("### store = {}", store);
        GetStoreDetailDto responseDto = storeMapper.getStoreDetailDto(store);

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
        String[] orderByList = getOrderByList(request.getSortCondition());
        List<DBStoreListDto> findStores = storeQueryRepository.getStoreList(maxLat,minLat,maxLng,minLng, request.getLat(), request.getLng(),orderByList,request.getFilterCondition(),isHoliday,userIdx);


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
    public SingleResponseDto getSearchStoreList(String keyword, Long userIdx) {
        List<DBStoreSearchDto> responseName = storeQueryRepository.searchStoreByName(keyword, userIdx);
        List<DBStoreSearchDto> responseAddress = storeQueryRepository.searchStoreByAddress(keyword, userIdx);

        responseName.addAll(responseAddress);
        List<DBStoreSearchDto> response = responseName.stream().distinct().collect(Collectors.toList());

        for (DBStoreSearchDto dbStoreSearchDto : response) {
            log.info("### responseIdx = {}",dbStoreSearchDto.getStoreIdx());
            log.info("### responseName = {}",dbStoreSearchDto.getName());
        }

        return SingleResponseDto.<List<DBStoreSearchDto>>builder()
                .response(response)
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

    private String[] getOrderByList(String orderCond) {
        switch (orderCond) {
            case "rating" :
                return new String[]{"rating","reviewCount","distance"};
            case "reviewCount":
                return new String[]{"reviewCount","rating","distance"};
            default:
                return new String[]{"distance","rating","reviewCount"};
        }
    }

}
