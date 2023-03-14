package com.project.mainproject.store.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter

public class GetStoreHomeListDto {
    private List<GetStoreHomeDto> storeHome;
}
