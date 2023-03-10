package com.project.mainproject.store.controller;

import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dummy.CommonStub;
import com.project.mainproject.store.dto.GetStoreHomeListDto;
import com.project.mainproject.store.dummy.StoreStub;
import lombok.RequiredArgsConstructor;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store")
public class StoreController {

    /*
     *  약국 목록_홈
     * */
    @GetMapping
    public ResponseEntity getStoreHome(@PageableDefault(sort = "storeIdx") Pageable pageable) {
        //TODO : Service 구현

        PageResponseDto build = CommonStub.getPageResponseStub();
        build.setResponse(GetStoreHomeListDto.builder().storeHome(StoreStub.getStoreHomeListStub()).build());

        return ResponseEntity.ok().body(build);
    }

    /*
     *  찜하기
     * */
    @PostMapping("/{storeIdx}/pick")
    public ResponseEntity pickedStore(@PathVariable Long storeIdx) {
        //TODO : Service 구현
        SingleResponseDto build = CommonStub.getSingleResponseStub();
        return ResponseEntity.ok().body(build);
    }
}

