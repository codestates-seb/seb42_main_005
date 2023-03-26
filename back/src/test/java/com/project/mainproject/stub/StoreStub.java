package com.project.mainproject.stub;

import com.project.mainproject.VO.OperatingTime;
import com.project.mainproject.store.dto.DBdto.DBPickedStoredListDto;
import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import com.project.mainproject.store.dto.DBdto.DBStoreListDto;
import com.project.mainproject.store.dto.DBdto.DBStoreSearchDto;
import com.project.mainproject.store.dto.GetStoreDetailDto;
import com.project.mainproject.store.dto.GetStoreListRequestDto;
import com.project.mainproject.store.dto.OperatingDayOfWeekDto;
import com.project.mainproject.store.dto.TodayOperatingTimeDto;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class StoreStub {

    /*
    * response 데이터
    * */
    public static List<DBStoreListDto> getDBStoreListStub() {
        List<DBStoreListDto> result = new ArrayList<>();
        for (Long i = 1L; i < 3; i++) {
            DBStoreListDto build = DBStoreListDto.builder()
                    .storeIdx(i)
                    .address("서울특별시 송파구 롯데타워 30" + i + "호점")
                    .longitude(203.12312312)
                    .latitude(111.22323311)
                    .imagePath("https://flexible.img.hani.co.kr/flexible/normal/658/479/imgdb/original/2023/0115/20230115501377.jpg")
                    .rating(4.2)
                    .modifiedAt(LocalDateTime.now())
                    .name("외국인 전용 약국")
                    .reviewCount(4L)
                    .pickedStoreCount(4L)
                    .isPicked(false)
                    .build();
            result.add(build);
        }
        return result;
    }

    public static List<DBPickedStoredListDto> getDBPickedStoredListStub() {
        List<DBPickedStoredListDto> result = new ArrayList<>();

        for (Long i = 1L; i < 3; i++) {
            DBPickedStoredListDto build = DBPickedStoredListDto.builder()
                    .storeIdx(i)
                    .address("서울특별시 송파구 롯데타워 30" + i + "호점")
                    .tel("010-1323-2323")
                    .name("사우디아라비아산 약국" + i + "호점")
                    .build();
            result.add(build);
        }
        return result;
    }

    public static GetStoreDetailDto getStoreDetailStub() {
        return GetStoreDetailDto.builder()
                .storeIdx(1L)
                .name("불타는약국")
                .address("서울특별시 송파구 잠실동 김수한무빌딩 201호")
                .longitude(203.12312312)
                .latitude(111.22323311)
                .tel("010-1232-1333")
                .etc("이곳은 비고란입니다.")
                .rating(4.2)
                .pickedStoreCount(4L)
                .reviewCount(65L)
                .imagePath("https://flexible.img.hani.co.kr/flexible/normal/658/479/imgdb/original/2023/0115/20230115501377.jpg")
                .todayOperatingTime(todayOperatingTimeStub())
                .operatingTime(operatingDayOfWeekStub())
                .isOperating(true)
                .isOperatingNight(true)
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .build();
    }

    public static List<DBStoreSearchDto> getDBStoreSearchStub() {
        List<DBStoreSearchDto> result = new ArrayList<>();

        for (Long i = 1L; i < 3; i++) {
            DBStoreSearchDto build = new DBStoreSearchDto(i,"한사랑 상호 "+i+"호점","서울특별시 송파구 롯데타워 30" + i + "호점",203.12312312,111.22323311,4.2,4L,4L,"https://flexible.img.hani.co.kr/flexible/normal/658/479/imgdb/original/2023/0115/20230115501377.jpg",LocalDateTime.now());
            result.add(build);
        }
        return result;
    }


    /*
     * requset 데이터
     * */
    public static GetStoreListRequestDto getStoreListRequestStub() {
        return GetStoreListRequestDto.builder()
                .lat(123.123123)
                .lng(123123.12313213)
                .swLng(123.123213)
                .neLng(123.123123)
                .neLat(123.123213)
                .swLat(123.123123)
                .distance(4L)
                .filterCondition("not")
                .sortCondition("distance")
                .build();
    }


    //### 내부 메서드 ###//
    private static OperatingTime operatingTimeStub() {
        return OperatingTime.builder()
                .startTime(LocalTime.now())
                .endTime(LocalTime.now())
                .build();
    }

    private static TodayOperatingTimeDto todayOperatingTimeStub() {
        return TodayOperatingTimeDto.builder()
                .operatingTime(operatingTimeStub())
                .build();
    }

    private static OperatingDayOfWeekDto operatingDayOfWeekStub() {
        return OperatingDayOfWeekDto.builder()
                .monday(operatingTimeStub())
                .tuesday(operatingTimeStub())
                .wednesday(operatingTimeStub())
                .holiday(operatingTimeStub())
                .friday(operatingTimeStub())
                .saturday(operatingTimeStub())
                .sunday(operatingTimeStub())
                .thursday(operatingTimeStub())
                .build();
    }
}
