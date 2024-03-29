package com.project.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserLoginInfoResponse {
    private Long userIdx;
    private String name;
    private String userRole;
    private String userType;
    private Long StoreIdx;
    private String address;

    public UserLoginInfoResponse(Long userIdx, String name, String userRole, String userType, String address) {
        this.userIdx = userIdx;
        this.name = name;
        this.userRole = userRole;
        this.userType = userType;
        this.address = address;
    }

}