package com.project.mainproject.store.controller;

import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dummy.CommonStub;
import com.project.mainproject.store.dto.FilterTagDto;
import com.project.mainproject.store.dto.GetStoreHomeListDto;
import com.project.mainproject.store.dto.StoreIdxResponse;
import com.project.mainproject.store.dummy.StoreStub;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store")
public class StoreController {

    /*
     *  약국 목록_홈
     * */
    @GetMapping
    public ResponseEntity getStoreHome(@PageableDefault(sort = "storeIdx") Pageable pageable, @RequestBody FilterTagDto filterTagDto) {
        //TODO : Service 구현

        PageResponseDto build = CommonStub.getPageResponseStub();
        build.setResponse(GetStoreHomeListDto.builder().storeHome(StoreStub.getStoreHomeListStub()).build());

        return ResponseEntity.ok().body(build);
    }

    /*
    * 약국 상세 조회
    * */
    @GetMapping("/{storeIdx}")
    public ResponseEntity getStoreDetail(@PathVariable Long storeIdx) {
        //TODO : Service 구현
        log.info("#### 이몸 등장!");

        SingleResponseDto build = CommonStub.getSingleResponseStub();
        build.setResponse(StoreStub.getStoreHomeDtoSub());

        return ResponseEntity.ok().body(build);
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
}

