package com.project.mainproject.store.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class GetStoreHomeDto {
    private Long storeIdx;
    private String name;
    private String address;
    private Double longitude;
    private Double latitude;
    private String tel;
    private String etc;
    private double rating;
    private String image; //StoreImage 값을 가져온다.
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<String> tags;
}
