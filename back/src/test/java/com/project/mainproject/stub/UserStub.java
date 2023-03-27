package com.project.mainproject.stub;

import com.project.mainproject.user.dto.UserFindPasswordDto;
import com.project.mainproject.user.dto.UserInfoDto;
import com.project.mainproject.user.dto.UserPatchDto;
import com.project.mainproject.user.dto.UserSignUpDto;
import com.project.mainproject.user.enums.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserStub {
    private static Map<String, Object> Userdto;

    static {
        Userdto = new HashMap<>();
        Userdto.put(
                "postNormal",
                new UserSignUpDto("홍길동", "hgd@gmail.com", "12341234a!", "서울특별시 서초구 서초대로 396")
        );
        Userdto.put(
                "postPharmacy",
                new UserSignUpDto("21세기약국", "21centuryPharm@gmail.com", "12341234a!", "서울특별시 서초구 서초대로 396")
        );
        Userdto.put(
                "patchUser",
                new UserPatchDto("감길동", "서울특별시 중구 을지로", "12341234a!", "a!12341234")
        );
        Userdto.put(
                "findPassword",
                new UserFindPasswordDto("zzanghd@gmail.com")
        );
    }
    public static Object getRequestBody(String dtoType) {
        return Userdto.get(dtoType);
    }
    public static UserInfoDto getUser() {
        return UserInfoDto.builder()
                .userIdx(1L)
                .createdAt(LocalDateTime.now())
                .name("홍길동")
                .email("hgd@gmail.com")
                .address("서울특별시 서초구 서초동")
                .imagePath(null)
                .userType("일반회원")
                .userStatus(UserStatus.ACTIVE)
                .reviewCount(1L)
                .reportCount(2L)
                .bannedRestoreDate(null)
                .build();
    }
    public static List<UserInfoDto> getUsers() {
        List<UserInfoDto> users = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            UserInfoDto user = UserInfoDto.builder()
                    .userIdx((long) i)
                    .createdAt(LocalDateTime.of(2023, 3, 20 + i, 0, 0, 0))
                    .name("홍길동" + i)
                    .email("hgd" + i + "@gmail.com")
                    .address("서울특별시 서초구 서초동" + i)
                    .imagePath(null)
                    .userType(i % 2 == 1 ? "약사회원" : "일반회원")
                    .userStatus(i % 3 == 1 ? UserStatus.TEMPORARY : UserStatus.ACTIVE)
                    .reviewCount((long) i)
                    .reportCount((long) 10-i)
                    .bannedRestoreDate(null)
                    .build();
            users.add(user);
        }
        return users;
    }
    public static Page<UserInfoDto> getPageUserInfoStub() {
        return new PageImpl<UserInfoDto>(getUsers());
    }
}
