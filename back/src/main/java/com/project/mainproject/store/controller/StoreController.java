package com.project.mainproject.store.controller;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dummy.CommonStub;
import com.project.mainproject.enums.ResultStatus;
import com.project.mainproject.store.dto.GetStoreDetailDto;
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
    public ResponseEntity getStoreHome(@RequestBody GetStoreListRequestDto requestDto) {
        //TODO : 정렬 조건에 대한 문제가 여전히 존재합니다. 해당 문제를 체크할 필요가 있습니다.

        SingleResponseDto response = storeGetService.getStoreSliceDto(requestDto);

        return ResponseEntity.ok().body(response);
    }

    /*
     * 약국 상세 조회
     * */
    @GetMapping("/{storeIdx}")
    public ResponseEntity getStoreDetail(@PathVariable Long storeIdx) {
        //TODO : Service 구현
        log.info("#### 이몸 등장!");

        GetStoreDetailDto findData = storeGetService.getStoreDetailDto(storeIdx);
        SingleResponseDto<GetStoreDetailDto> responseDto = SingleResponseDto.<GetStoreDetailDto>builder()
                .response(findData)
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .build();

        return ResponseEntity.ok().body(responseDto);
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

