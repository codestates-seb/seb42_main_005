package com.project.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserLoginInfoResponse {
    private Long userIdx;
    private String name;
    private String userRole;
    private Long StoreIdx;
    private String address;

    public UserLoginInfoResponse(Long userIdx, String name, String userRole, String address) {
        this.userIdx = userIdx;
        this.name = name;
        this.userRole = userRole;
        this.address = address;
    }
}