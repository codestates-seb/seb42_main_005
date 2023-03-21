package com.project.mainproject.store.controller;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.store.dto.GetStoreListRequestDto;
import com.project.mainproject.store.dto.StoreSearchStoreDto;
import com.project.mainproject.store.service.StoreGetService;
import com.project.mainproject.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store")
public class StoreController {
    private final StoreGetService storeGetService;
    private final StoreService storeService;
    /*
     *  약국 목록_페이지 리스트
     * */
    @GetMapping
    public ResponseEntity getStoreList(@RequestBody GetStoreListRequestDto requestDto) {
        SingleResponseDto response = storeGetService.getStoreListDto(requestDto);

        return ResponseEntity.ok().body(response);
    }

    /*
     * 약국 상세 조회 - 완성
     * */
    @GetMapping("/{storeIdx}")
    public ResponseEntity getStoreDetail(@PathVariable Long storeIdx) {
        SingleResponseDto storeDetailDto = storeGetService.getStoreDetailDto(storeIdx);

        return ResponseEntity.ok(storeDetailDto);
    }

    /*
     *  찜하기
     * */
    @PostMapping("/{storeIdx}/pick")
    public ResponseEntity pickedStore(@PathVariable Long storeIdx,@RequestParam Long userIdx) {
        SingleResponseDto responseDto = storeService.pickStore(userIdx, storeIdx);
        //TODO : 로그인 기능 구현 완료 시 SecurityContext에서 UserIdx를 따로 뽑아 사용하게 변경해야한다.
        if (responseDto.getHttpCode() == 200) {
            return ResponseEntity.ok().body(responseDto);
        }
        return ResponseEntity.noContent().build();
    }

    /*
    *  찜한 약국 보여주기
    * */
    @GetMapping("/user/{userIdx}/pick/")
    public ResponseEntity getPickedStoreList(@PathVariable Long userIdx) {
        SingleResponseDto pickedStoreList = storeGetService.getPickedStoreList(userIdx);

        return ResponseEntity.ok(pickedStoreList);
    }

    /*
     * 약국 이름으로 검색하기
     * */
    @GetMapping("/search")
    public ResponseEntity searchStore(@RequestBody StoreSearchStoreDto storeSearchStoreDto) {
        SingleResponseDto searchResult = storeGetService.getSearchStoreList(storeSearchStoreDto);

        return ResponseEntity.ok(searchResult);
    }
}

