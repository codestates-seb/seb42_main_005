package com.project.mainproject.store.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetStoreListRequestDto {
    private Long storeIdx;
    private Double lat;
    private Double lng;
    private Long distance;
    private String sortCondition;
}
