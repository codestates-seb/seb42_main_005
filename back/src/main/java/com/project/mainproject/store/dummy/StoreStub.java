package com.project.mainproject.store.dummy;

import com.project.mainproject.store.dto.GetStoreHomeDto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class StoreStub {
    public static List<GetStoreHomeDto> getStoreHomeListStub() {
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
                    .tags(List.of("재료가 신선해요", "주차장이 넓어요"))
                    .tel("010-1234-1234")
                    .name("주사랑믿음약국")
                    .build();
            result.add(build);
        }
        return result;
    }

    public static GetStoreHomeDto getStoreHomeDtoSub() {
        return GetStoreHomeDto.builder()
                .storeIdx(1L)
                .etc("이곳은 비고란입니다.")
                .address("서울 특별시 송파구 롯데타워 301호점")
                .longitude(203.12312312)
                .latitude(111.22323311)
                .image("https://flexible.img.hani.co.kr/flexible/normal/658/479/imgdb/original/2023/0115/20230115501377.jpg")
                .rating(4.2)
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .tags(List.of("재료가 신선해요", "주차장이 넓어요"))
                .tel("010-1234-1234")
                .name("주사랑믿음약국")
                .build();
    }
}
