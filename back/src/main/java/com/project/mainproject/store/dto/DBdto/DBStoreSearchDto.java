package com.project.mainproject.store.dto.DBdto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import org.mapstruct.Builder;

import java.time.LocalDateTime;

@Getter
public class DBStoreSearchDto {
    private Long storeIdx;
    private String name;
    private String address;
    private double latitude;
    private double longitude;
    private double rating;
    private Long pickedStoreCount;
    private Long reviewCount;
    private String imagePath;
    private LocalDateTime modifiedAt;

    @QueryProjection
    public DBStoreSearchDto(Long storeIdx, String name, String address, double latitude, double longitude, double rating, Long pickedStoreCount, Long reviewCount, String imagePath, LocalDateTime modifiedAt) {
        this.storeIdx = storeIdx;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.rating = rating;
        this.pickedStoreCount = pickedStoreCount;
        this.reviewCount = reviewCount;
        this.imagePath = imagePath;
        this.modifiedAt = modifiedAt;
    }
}
