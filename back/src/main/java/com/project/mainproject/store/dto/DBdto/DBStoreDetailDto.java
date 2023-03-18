package com.project.mainproject.store.dto.DBdto;

import com.project.mainproject.VO.OperatingTime;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Collection;

@Getter
@Setter
public class DBStoreDetailDto {
    private Long storeIdx;
    private String name;
    private String address;
    private Double longitude;
    private Double latitude;
    private String tel;
    private String etc;
    private double rating;
    private Long likeStoreCount;
    private Collection<String> image;
    private OperatingTime monday;
    private OperatingTime tuesday;
    private OperatingTime wednesday;
    private OperatingTime thursday;
    private OperatingTime friday;
    private OperatingTime saturday;
    private OperatingTime sunday;
    private OperatingTime holiday;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public DBStoreDetailDto(Long storeIdx, String name, String address, Double longitude, Double latitude, String tel, String etc, double rating, Long likeStoreCount, Collection<String> image, OperatingTime monday, OperatingTime tuesday, OperatingTime wednesday, OperatingTime thursday, OperatingTime friday, OperatingTime saturday, OperatingTime sunday, OperatingTime holiday, LocalDateTime createdAt, LocalDateTime modifiedAt) {
        this.storeIdx = storeIdx;
        this.name = name;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
        this.tel = tel;
        this.etc = etc;
        this.rating = rating;
        this.likeStoreCount = likeStoreCount;
        this.image = image;
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
        this.saturday = saturday;
        this.sunday = sunday;
        this.holiday = holiday;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
