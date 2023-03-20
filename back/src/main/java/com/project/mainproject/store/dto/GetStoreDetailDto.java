package com.project.mainproject.store.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetStoreDetailDto {
    private Long storeIdx;
    private String name;
    private String address;
    private Double longitude;
    private Double latitude;
    private String tel;
    private String etc;
    private double rating;
    private Long pickedStoreCount;
    private String image;
    private TodayOperatingTimeDto todayOperatingTime;
    private OperatingDayOfWeekDto operatingTime;
    private Boolean isOperating;
    private Boolean isOperatingNight;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


}
