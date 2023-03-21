package com.project.mainproject.store.controller;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dummy.CommonStub;
import com.project.mainproject.store.dto.GetStoreListRequestDto;
import com.project.mainproject.store.dto.StoreIdxResponse;
import com.project.mainproject.store.service.StoreGetService;
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
        return ResponseEntity.ok(storeGetService.getStoreDetailDto(storeIdx));
    }

    /*
     *  찜하기
     * */
    @PostMapping("/{storeIdx}/pick")
    public ResponseEntity pickedStore(@PathVariable Long storeIdx) {
        //TODO : Service 구현


        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(StoreIdxResponse.builder().storeIdx(1L).build());
        return ResponseEntity.ok().body(build);
    }

    /*
    *  찜한 약국 보여주기
    * */

    @GetMapping("/user/{userIdx}/pick/")
    public ResponseEntity getPickedStoreList(@PathVariable Long userIdx) {
        SingleResponseDto pickedStoreList = storeGetService.getPickedStoreList(userIdx);

        return ResponseEntity.ok().body(pickedStoreList);
    }

}

