package com.project.mainproject.store.controller;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.store.dto.GetStoreListRequestDto;
import com.project.mainproject.store.service.StoreGetService;
import com.project.mainproject.store.service.StoreService;
import com.project.mainproject.utils.CheckLoginUser;
import com.project.mainproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.security.Principal;

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
    public ResponseEntity getStoreList(@ModelAttribute GetStoreListRequestDto requestDto, @AuthenticationPrincipal Object principal) {
        Long userIdx = CheckLoginUser.getContextIdx(principal);


        SingleResponseDto response = storeGetService.getStoreListDto(requestDto,userIdx);

        return ResponseEntity.ok().body(response);
    }

    /*
     * 약국 상세 조회 - 완성
     * */
    @GetMapping("/{storeIdx}")
    public ResponseEntity getStoreDetail(@PathVariable Long storeIdx,@AuthenticationPrincipal Object principal) {
        Long userIdx = CheckLoginUser.getContextIdx(principal);
        SingleResponseDto storeDetailDto = storeGetService.getStoreDetailDto(storeIdx,userIdx);

        return ResponseEntity.ok(storeDetailDto);
    }

    /*
     *  찜하기
     * */
    @PostMapping("/{storeIdx}/pick")
    public ResponseEntity pickedStore(@PathVariable Long storeIdx, @RequestParam Long userIdx) {
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
    public ResponseEntity searchStore(@RequestParam String keyword) {
        SingleResponseDto searchResult = storeGetService.getSearchStoreList(keyword);

        return ResponseEntity.ok(searchResult);
    }

    /*
    * 약국 사진 변경 
    * */
    @PostMapping("/image")
    public ResponseEntity updateImage(@RequestPart MultipartFile profileImage , @RequestParam Long userIdx) {
        SingleResponseDto updateImageResult = storeService.updateImage(userIdx, profileImage);
        URI location = UriCreator.createUri("/api/user/", userIdx);

        return ResponseEntity.ok().header("location",location.toString()).body(updateImageResult);
    }

}