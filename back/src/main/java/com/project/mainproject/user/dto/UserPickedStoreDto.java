package com.project.mainproject.user.dto;

import com.project.mainproject.store.dto.GetPickedStoreDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class UserPickedStoreDto {

    List<GetPickedStoreDto> stores;

}
