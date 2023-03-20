package com.project.mainproject.store.dto.DBdto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class DBStoreListDto {
    private Long storeIdx;
    private String name;
    private String address;
    private double latitude;
    private double longitude;
    private double rating;
    private double distance;
    private Long pickedStoreCount;
    private Long reviewCount;
    private String image;
    private LocalDateTime modifiedAt;

    @QueryProjection
    public DBStoreListDto(Long storeIdx, String name, String address, double latitude, double longitude, double rating, double distance, Long pickedStoreCount, Long reviewCount, String image, LocalDateTime modifiedAt) {
        this.storeIdx = storeIdx;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.rating = rating;
        this.distance = distance;
        this.pickedStoreCount = pickedStoreCount;
        this.reviewCount = reviewCount;
        this.image = image;
        this.modifiedAt = modifiedAt;
    }
}
