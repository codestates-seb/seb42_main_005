package com.project.mainproject.store.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetPickedStoreDto {
    private Long storeIdx;
    private String name;
    private String address;
    private String tel;
}