package com.project.mainproject.user.controller;

import com.project.mainproject.dto.PageInfo;
import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.enums.ResultStatus;
import com.project.mainproject.user.dto.*;
import com.project.mainproject.user.dummy.UserData;
import com.project.mainproject.utils.UriCreator;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/users")
public class UserController {

    public final static String USERS_DEFAULT_URL = "/api/users";

    /*
        일반 회원가입
     */
    @PostMapping("/normal")
    public ResponseEntity normalSignUp(@RequestBody PostUserSignUpDto signUpDto) {
        // TODO: Save Normal User
        URI location = UriCreator.createUri(USERS_DEFAULT_URL, 1);
        SingleResponseDto response = SingleResponseDto.builder()
                .httpCode(ResultStatus.CREATE_COMPLETED.getHttpCode())
                .message(ResultStatus.CREATE_COMPLETED.getMessage())
                .build();
        return ResponseEntity.created(location).body(response);
    }

    /*
        약국 회원가입
     */
    @PostMapping("/store")
    public ResponseEntity pharmacySignUp(@RequestBody PostUserSignUpDto signUpDto
                                // , @RequestPart MultipartFile businessCertificate
                                // , @RequestPart MultipartFile pharmacistCertificate
    ) {
        // TODO: Save Pharmacy User
        URI location = UriCreator.createUri(USERS_DEFAULT_URL, 1);
        SingleResponseDto response = SingleResponseDto.builder()
                .httpCode(ResultStatus.CREATE_COMPLETED.getHttpCode())
                .message(ResultStatus.CREATE_COMPLETED.getMessage())
                .build();
        return ResponseEntity.created(location).body(response);
    }

    /*
        비밀번호 찾기
     */
    @PostMapping("/password")
    public ResponseEntity findPassword(@RequestBody UserFindPasswordDto findPasswordDto) {
        // TODO: Send Password Init Email
        SingleResponseDto response = SingleResponseDto.builder()
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .build();
        return ResponseEntity.ok().body(response);
    }

    /*
        회원 정보 조회_기본 정보
     */
    @GetMapping("/{userIdx}")
    public ResponseEntity getUserInfo(@PathVariable("userIdx") Long userIdx) {
        // TODO: Find User Information
        UserInfoDto dummyUser = UserData.getUser();
        SingleResponseDto response = SingleResponseDto.builder()
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .response(dummyUser)
                .build();
        return ResponseEntity.ok().body(response);
    }

    /*
        전체 회원 목록 조회
     */
    @GetMapping
    public ResponseEntity getUsers(Pageable pageable) {
        // TODO: Find All User Information
        PageInfo pageInfo = PageInfo.builder()
                .page(0)
                .size(10)
                .totalPage(100)
                .totalElement(1000)
                .isFinish(false)
                .isFirst(true)
                .build();
        UsersDto dummyUsers = UsersDto.builder().users(UserData.getUsers()).build();
        PageResponseDto response = PageResponseDto.builder()
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .response(dummyUsers)
                .pageInfo(pageInfo)
                .build();
        return ResponseEntity.ok().body(response);
    }

    /*
        회원 정보 조회_작성 리뷰
  뷰  */
    @GetMapping("{userIdx}/review")
    public ResponseEntity getUserReviews(Pageable pageable, @PathVariable("userIdx") Long userIdx) {
        // TODO: Find Reviews User Wrote
        PageInfo pageInfo = PageInfo.builder()
                .page(0)
                .size(10)
                .totalPage(100)
                .totalElement(1000)
                .isFinish(false)
                .isFirst(true)
                .build();
        UserReviewDto dummyReviews = UserReviewDto.builder().reviews(UserData.getReviews()).build();
        PageResponseDto response = PageResponseDto.builder()
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .response(dummyReviews)
                .pageInfo(pageInfo)
                .build();
        return ResponseEntity.ok().body(response);
    }

    /*
        회원 정보 조회_찜한 약국
     */
    @GetMapping("{userIdx}/store")
    public ResponseEntity getUserPickedStore(Pageable pageable, @PathVariable("userIdx") Long userIdx) {
        // TODO: Find Stores User Picked
        PageInfo pageInfo = PageInfo.builder()
                .page(0)
                .size(10)
                .totalPage(100)
                .totalElement(1000)
                .isFinish(false)
                .isFirst(true)
                .build();
        UserPickedStoreDto dummyStores = UserPickedStoreDto.builder().stores(UserData.getPickedStores()).build();
        PageResponseDto response = PageResponseDto.builder()
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .response(dummyStores)
                .pageInfo(pageInfo)
                .build();
        return ResponseEntity.ok().body(response);
    }

    /*
        회원 기본 정보 수정
     */
    @PatchMapping("{userIdx}")
    public ResponseEntity patchUserInfo(@PathVariable("userIdx") Long userIdx,
                                        @RequestBody PostUserPatchDto patchDto) {
        // TODO: Change User Profile
        URI location = UriCreator.createUri(USERS_DEFAULT_URL, 1);
        SingleResponseDto response = SingleResponseDto.builder()
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .build();
        return ResponseEntity.ok().header("Location", location.toString()).body(response);
    }

    /*
        회원 프로필 이미지 수정
     */
    @PatchMapping("{userIdx}/image")
    public ResponseEntity patchUserProfileImage(@PathVariable("userIdx") Long userIdx
                                                // ,MultipartFile profileImage
    ) {
        // TODO: Chane User Profile Image
        URI location = UriCreator.createUri(USERS_DEFAULT_URL, 1);
        SingleResponseDto response = SingleResponseDto.builder()
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .build();
        return ResponseEntity.ok().header("Location", location.toString()).body(response);
    }

    /*
        회원 탈퇴
     */
    @DeleteMapping("{userIdx}")
    public ResponseEntity deleteUser(@PathVariable("userIdx") Long userIdx) {
        // TODO: User Withdraw
        SingleResponseDto response = SingleResponseDto.builder()
                .httpCode(ResultStatus.DELETE_COMPLETED.getHttpCode())
                .message(ResultStatus.DELETE_COMPLETED.getMessage())
                .build();
        return ResponseEntity.noContent().build();
    }

}
