package com.project.mainproject.store.dto.DBdto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class DBPickedStoredListDto {
    private Long storeIdx;
    private String name;
    private String address;
    private String tel;

    @QueryProjection
    public DBPickedStoredListDto(Long storeIdx, String name, String address, String tel) {
        this.storeIdx = storeIdx;
        this.name = name;
        this.address = address;
        this.tel = tel;
    }
}
