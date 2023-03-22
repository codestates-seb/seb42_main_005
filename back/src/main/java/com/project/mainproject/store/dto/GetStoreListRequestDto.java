package com.project.mainproject.store.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetStoreListRequestDto {
    private Long storeIdx;
    private Double lat;
    private Double lng;
    private Double swLat;
    private Double swLng;
    private Double neLat;
    private Double neLng;
    private Long distance;
    private String sortCondition;
    private String filterCondition;
}
