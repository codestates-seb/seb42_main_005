package com.project.mainproject.store.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class GetStoreListRequestDto {
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
