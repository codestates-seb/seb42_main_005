package com.project.mainproject.store.controller;

import com.project.mainproject.dto.PageInfo;
import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.store.dto.GetStoreHomeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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


        PageInfo pageInfo = PageInfo.builder()
                .page(0)
                .size(10)
                .totalPage(100)
                .totalElement(1000)
                .isFinish(false)
                .isFirst(true)
                .build();
        List<GetStoreHomeDto> result = new ArrayList<>();
        for (Long i = 1L; i < 10; i++) {
            GetStoreHomeDto build = GetStoreHomeDto.builder()
                    .storeIdx(i)
                    .etc("이곳은 비고란입니다.")
                    .address("서울 특별시 송파구 롯데타워 301호점")
                    .longitude(203.12312312)
                    .latitude(111.22323311)
                    .image("https://flexible.img.hani.co.kr/flexible/normal/658/479/imgdb/original/2023/0115/20230115501377.jpg")
                    .rating(4.2)
                    .createdAt(LocalDateTime.now())
                    .modifiedAt(LocalDateTime.now())
                    .tags(List.of("재료가 신선햏요", "주차장이 넓어요"))
                    .tel("010-1234-1234")
                    .name("주사랑믿음약국")
                    .build();
            result.add(build);
        }
        PageResponseDto<List<GetStoreHomeDto>> build = PageResponseDto.<List<GetStoreHomeDto>>builder()
                .response(result)
                .pageInfo(pageInfo)
                .message("success !!")
                .httpCode(HttpStatus.OK.value()).build();
        return ResponseEntity.ok().body(build);
    }

    /*
     *  찜하기
     * */
    @PostMapping("/{storeIdx}/pick")
    public ResponseEntity pickedStore(@PathVariable Long storeIdx) {
        //TODO : Service 구현

        SingleResponseDto<Object> build = SingleResponseDto.builder().message("작업 완료!").httpCode(HttpStatus.OK.value()).build();
        return ResponseEntity.ok().body(build);
    }
}

