package com.project.mainproject.user.controller;

import com.project.mainproject.dto.PageInfo;
import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dto.UserIdxRequestDto;
import com.project.mainproject.stub.CommonStub;
import com.project.mainproject.user.dto.*;
import com.project.mainproject.user.mapper.UserMapper;
import com.project.mainproject.user.service.UserService;
import com.project.mainproject.utils.UriCreator;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;

import static com.project.mainproject.enums.ResultStatus.PROCESS_COMPLETED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {
    public final static String USERS_DEFAULT_URL = "/api/users";
    private UserService userService;
    private UserMapper userMapper;
    private final ApplicationEventPublisher publisher;

    /*
            일반 회원가입
         */
    @PostMapping("/normal")
    public ResponseEntity normalSignUp(@RequestBody UserSignUpDto userSignUpDto) {
        userService.saveNormal(userMapper.normalSignUpDtoToUser(userSignUpDto));

        URI location = UriCreator.createUri(USERS_DEFAULT_URL + "/normal");
        SingleResponseDto response = SingleResponseDto.builder()
                .message(PROCESS_COMPLETED.getMessage()).httpCode(PROCESS_COMPLETED.getHttpCode()).build();
        return ResponseEntity.created(location).body(response);
    }

    /*
        약국 회원가입
     */
    @PostMapping(value = "/store", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity storeSignUp(@RequestPart UserSignUpDto userSignUpDto
                                 , @RequestPart MultipartFile businessCertificate
                                 , @RequestPart MultipartFile pharmacistCertificate) {
        userService.savePharmacy(userMapper.pharmacySignUpDtoToUser(userSignUpDto), businessCertificate, pharmacistCertificate);

        URI location = UriCreator.createUri(USERS_DEFAULT_URL + "/store");
        SingleResponseDto response = SingleResponseDto.builder()
                .message(PROCESS_COMPLETED.getMessage()).httpCode(PROCESS_COMPLETED.getHttpCode()).build();

        return ResponseEntity.created(location).body(response);
    }

    /*
        약사 가입신청 조회
     */
    @GetMapping("/store")
    public ResponseEntity getStoreRequest(Pageable pageable) {
        Page<PharmacyInfoDto> pharmacyPage = userService.findPharmacyRequest(pageable);
//        Page<PharmacyInfoDto> pharmacyInfoDtoPage = pharmacyPage.map(PharmacyInfoDto::new);

        PageInfo pageInfo = PageInfo.builder()
                .size(pageable.getPageSize())
                .page(pageable.getPageNumber())
                .totalElement(pharmacyPage.getTotalElements())
                .totalPage(pharmacyPage.getTotalPages())
                .build();

        PageResponseDto<Object> response = PageResponseDto.builder()
                .response(pharmacyPage).pageInfo(pageInfo)
                .message(PROCESS_COMPLETED.getMessage()).httpCode(PROCESS_COMPLETED.getHttpCode())
                .build();
        return ResponseEntity.ok().body(response);
    }

    /*
        비밀번호 찾기
     */
    @PatchMapping("/password")
    public ResponseEntity findPassword(@RequestBody UserFindPasswordDto findPasswordDto) {

        userService.findPassword(findPasswordDto.getEmail());

        SingleResponseDto response = CommonStub.getSingleResponseStub(PROCESS_COMPLETED);
        return ResponseEntity.ok().body(response);
    }

    /*
        회원 정보 조회_기본 정보
     */
    @GetMapping("/{userIdx}")
    public ResponseEntity getUserInfo(@PathVariable("userIdx") Long userIdx) {
        UserInfoDto user = userService.findUser(userIdx);

        SingleResponseDto response = SingleResponseDto.builder()
                .response(user)
                .message(PROCESS_COMPLETED.getMessage()).httpCode(PROCESS_COMPLETED.getHttpCode()).build();

        return ResponseEntity.ok().body(response);
    }

    /*
        전체 회원 목록 조회
     */
    @GetMapping
    public ResponseEntity getUsers(
            @PageableDefault(size = 20, sort = "createdAt",direction = Sort.Direction.DESC) Pageable pageable) {
        Page<UserInfoDto> userPage = userService.findUsers(pageable);

        PageInfo pageInfo = PageInfo.builder()
                .size(pageable.getPageSize())
                .page(pageable.getPageNumber())
                .totalElement(userPage.getTotalElements())
                .totalPage(userPage.getTotalPages())
                .build();

        PageResponseDto<Object> response = PageResponseDto.builder()
                .response(userPage.getContent()).pageInfo(pageInfo)
                .message(PROCESS_COMPLETED.getMessage()).httpCode(PROCESS_COMPLETED.getHttpCode())
                .build();

        return ResponseEntity.ok().body(response);
    }

    /*
        회원 기본 정보 수정
     */
    @PatchMapping("/{userIdx}")
    public ResponseEntity patchUserInfo(@PathVariable("userIdx") Long userIdx,
                                        @RequestBody UserPatchDto userpatchDto) {
        userService.patchUser(userIdx, userpatchDto);

        URI location = UriCreator.createUri(USERS_DEFAULT_URL, userIdx);
        SingleResponseDto response = SingleResponseDto.builder()
                .message(PROCESS_COMPLETED.getMessage()).httpCode(PROCESS_COMPLETED.getHttpCode()).build();
        return ResponseEntity.ok().body(response);
    }

    /*
        회원 프로필 이미지 등록&수정
     */
    @PostMapping(value = "/image", consumes = {APPLICATION_JSON_VALUE, MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postUserProfileImage(@RequestPart UserIdxRequestDto userIdx,
                                                @RequestPart MultipartFile profileImage) {
        userService.patchUserProfile(userIdx.getUserIdx(), profileImage);

        URI location = UriCreator.createUri(USERS_DEFAULT_URL + "/image");
        SingleResponseDto response = SingleResponseDto.builder()
                .message(PROCESS_COMPLETED.getMessage()).httpCode(PROCESS_COMPLETED.getHttpCode()).build();
        return ResponseEntity.ok().header("Location", location.toString()).body(response);
    }

    /*
        회원 탈퇴
     */
    @DeleteMapping("/{userIdx}")
    public ResponseEntity deleteUser(@PathVariable("userIdx") Long userIdx) {
        userService.deleteUser(userIdx);

        return ResponseEntity.noContent().build();
    }

}
