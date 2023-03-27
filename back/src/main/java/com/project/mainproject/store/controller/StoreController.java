package com.project.mainproject.store.controller;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dto.UserIdxRequestDto;
import com.project.mainproject.store.dto.GetStoreListRequestDto;
import com.project.mainproject.store.service.StoreGetService;
import com.project.mainproject.store.service.StoreService;
import com.project.mainproject.utils.CheckLoginUser;
import com.project.mainproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

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
    public ResponseEntity pickedStore(@AuthenticationPrincipal Object principal,@PathVariable Long storeIdx ,@RequestParam Long userIdx) {
        Long loginUserIdx = CheckLoginUser.getContextIdx(principal);

        SingleResponseDto responseDto = storeService.pickStore(userIdx, storeIdx,loginUserIdx);
        //TODO : 로그인 기능 구현 완료 시 SecurityContext에서 UserIdx를 따로 뽑아 사용하게 변경해야한다.

        if (responseDto.getHttpCode() == 200) {
            return ResponseEntity.ok().body(responseDto);
        }
        return ResponseEntity.noContent().build();
    }

    /*
     *  찜한 약국 보여주기
     * */
    @GetMapping("/users/{userIdx}/pick")
    public ResponseEntity getPickedStoreList(@PathVariable Long userIdx) {
        SingleResponseDto pickedStoreList = storeGetService.getPickedStoreList(userIdx);

        return ResponseEntity.ok(pickedStoreList);
    }

    /*
     * 약국 이름으로 검색하기
     * */
    @GetMapping("/search")
    public ResponseEntity searchStore(@RequestParam String keyword , @AuthenticationPrincipal Object principal) {
        Long userIdx = CheckLoginUser.getContextIdx(principal);
        SingleResponseDto searchResult = storeGetService.getSearchStoreList(keyword, userIdx);

        return ResponseEntity.ok(searchResult);
    }

    /*
    * 약국 사진 변경 
    * */
    @PostMapping(value = "/image",consumes = {APPLICATION_JSON_VALUE, MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity updateImage(@RequestPart MultipartFile profileImage , @RequestPart UserIdxRequestDto userIdx) {
        SingleResponseDto updateImageResult = storeService.updateImage(userIdx.getUserIdx(), profileImage);
        URI location = UriCreator.createUri("/api/user/", userIdx.getUserIdx());

        return ResponseEntity.ok().header("location",location.toString()).body(updateImageResult);
    }

}