package com.project.mainproject.user.dummy;

import com.project.mainproject.review.dto.GetReviewDto;
import com.project.mainproject.store.dto.GetPickedStoreDto;
import com.project.mainproject.user.dto.UserInfoDto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.project.mainproject.user.dto.UsersDto.UserDto;

public class UserData {
    public static UserInfoDto getUser() {
        return UserInfoDto.builder()
                .userIdx(1L)
                .name("강호동")
                .dob(LocalDateTime.now()) // 수정 필요할 듯
                .createdAt(LocalDateTime.now())
                .email("zzanghd@gmail.com")
                .address("서울특별시 강남구 청담동")
                .build();
    }

    public static List<UserDto> getUsers() {
        List<UserDto> users = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            UserDto user = UserDto.builder()
                    .userIdx((long) i)
                    .userType(i % 2 == 1 ? "약사" : "일반")
                    .name("강호동" + i)
                    .email("test" + i + "@gmail.com")
                    .createdAt(LocalDateTime.now())
                    .reviewCnt(i)
                    .reportCnt(i)
                    .build();
            users.add(user);
        }
        return users;
    }

    public static List<GetPickedStoreDto> getPickedStores() {
        List<GetPickedStoreDto> stores = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            GetPickedStoreDto store = GetPickedStoreDto.builder()
                    .address("서울특별시 종로구 종로" + i +"가동 123")
                    .storeIdx((long) i)
                    .name(i + "번가 약국")
                    .tel("02-0000-" + i + i + i + i)
                    .build();
            stores.add(store);
        }
        return stores;
    }

    public static List<GetReviewDto> getReviews() {
        List<GetReviewDto> reviews = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            GetReviewDto review = GetReviewDto.builder()
                    .reviewIdx((long) i + 1)
                    .storeIdx((long) i)
                    .storeName(i + "번가 약국")
                    .content(i + "점 드립니다")
                    .build();
            reviews.add(review);
        }
        return reviews;
    }
}
