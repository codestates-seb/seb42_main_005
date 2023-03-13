package com.project.mainproject.user.controller;

import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dummy.CommonStub;
import com.project.mainproject.user.dto.*;
import com.project.mainproject.user.dummy.UserStub;
import com.project.mainproject.utils.UriCreator;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;

@RestController
@RequestMapping("/api/users")
public class UserController {

    public final static String USERS_DEFAULT_URL = "/api/users";

    /*
        일반 회원가입
     */
    @PostMapping("/normal")
    public ResponseEntity normalSignUp(@RequestBody UserSignUpDto signUpDto) {
        // TODO: Save Normal User

        URI location = UriCreator.createUri(USERS_DEFAULT_URL, 1);
        SingleResponseDto response = CommonStub.getSingleResponseStub();
        return ResponseEntity.created(location).body(response);
    }

    /*
        약국 회원가입
     */
    @PostMapping("/store")
    public ResponseEntity pharmacySignUp(@RequestBody UserSignUpDto signUpDto
                                // , @RequestPart MultipartFile businessCertificate
                                // , @RequestPart MultipartFile pharmacistCertificate
    ) {
        // TODO: Save Pharmacy User

        URI location = UriCreator.createUri(USERS_DEFAULT_URL, 1);
        SingleResponseDto response = CommonStub.getSingleResponseStub();
        return ResponseEntity.created(location).body(response);
    }

    /*
        비밀번호 찾기
     */
    @PatchMapping("/password/{userIdx}")
    public ResponseEntity findPassword(@PathVariable("userIdx") Long userIdx,
                                       @RequestBody UserFindPasswordDto findPasswordDto) {
        // TODO: Send Password Init Email

        SingleResponseDto response = CommonStub.getSingleResponseStub();
        return ResponseEntity.ok().body(response);
    }

    /*
        회원 정보 조회_기본 정보
     */
    @GetMapping("/{userIdx}")
    public ResponseEntity getUserInfo(@PathVariable("userIdx") Long userIdx) {
        // TODO: Find User Information

        UserInfoDto dummyUser = UserStub.getUser();
        SingleResponseDto response = CommonStub.getSingleResponseStub();
        response.setResponse(dummyUser);
        return ResponseEntity.ok().body(response);
    }

    /*
        전체 회원 목록 조회
     */
    @GetMapping
    public ResponseEntity getUsers(Pageable pageable) {
        // TODO: Find All User Information

        UsersDto dummyUsers = UsersDto.builder().users(UserStub.getUsers()).build();
        PageResponseDto<UsersDto> response = CommonStub.getPageResponseStub();
        response.setResponse(dummyUsers);
        return ResponseEntity.ok().body(response);
    }

    /*
        회원 정보 조회_작성 리뷰
    */
    @GetMapping("{userIdx}/review")
    public ResponseEntity getUserReviews(Pageable pageable, @PathVariable("userIdx") Long userIdx) {
        // TODO: Find Reviews User Wrote

        UserReviewDto dummyReviews = UserReviewDto.builder().reviews(UserStub.getReviews()).build();
        PageResponseDto<UserReviewDto> response = CommonStub.getPageResponseStub();
        response.setResponse(dummyReviews);
        return ResponseEntity.ok().body(response);
    }

    /*
        회원 정보 조회_찜한 약국
     */
    @GetMapping("{userIdx}/store")
    public ResponseEntity getUserPickedStore(Pageable pageable, @PathVariable("userIdx") Long userIdx) {
        // TODO: Find Stores User Picked

        UserPickedStoreDto dummyStores = UserPickedStoreDto.builder().stores(UserStub.getPickedStores()).build();
        PageResponseDto<UserPickedStoreDto> response = CommonStub.getPageResponseStub();
        response.setResponse(dummyStores);
        return ResponseEntity.ok().body(response);
    }

    /*
        회원 기본 정보 수정
     */
    @PatchMapping("{userIdx}")
    public ResponseEntity patchUserInfo(@PathVariable("userIdx") Long userIdx,
                                        @RequestBody UserPatchDto patchDto) {
        // TODO: Change User Profile

        URI location = UriCreator.createUri(USERS_DEFAULT_URL, 1);
        SingleResponseDto response = CommonStub.getSingleResponseStub();
        return ResponseEntity.ok().header("Location", location.toString()).body(response);
    }

    /*
        회원 프로필 이미지 수정
     */
    @PostMapping("{userIdx}/image")
    public ResponseEntity postUserProfileImage(@PathVariable("userIdx") Long userIdx,
                                                @RequestPart MultipartFile profileImage
    ) {
        // TODO: Chane User Profile Image

        URI location = UriCreator.createUri(USERS_DEFAULT_URL, 1);
        SingleResponseDto response = CommonStub.getSingleResponseStub();
        return ResponseEntity.ok().header("Location", location.toString()).body(response);
    }

    /*
        회원 탈퇴
     */
    @DeleteMapping("{userIdx}")
    public ResponseEntity deleteUser(@PathVariable("userIdx") Long userIdx) {
        // TODO: User Withdraw

        SingleResponseDto response = CommonStub.getSingleResponseStub();
        return ResponseEntity.noContent().build();
    }

}
