package com.project.mainproject.store.dto.DBdto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@EqualsAndHashCode
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
    private boolean isPicked;

    @QueryProjection
    public DBStoreSearchDto(
            Long storeIdx, String name, String address, double latitude, double longitude, double rating,
            Long pickedStoreCount, Long reviewCount, String imagePath, LocalDateTime modifiedAt, boolean isPicked
    ) {
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
        this.isPicked = isPicked;
    }
}
