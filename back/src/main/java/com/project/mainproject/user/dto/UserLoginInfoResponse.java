package com.project.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserLoginInfoResponse {
    private Long userIdx;
    private String userRole;
    private Long StoreIdx;
    private String latitude;
    private String longitude;

    public UserLoginInfoResponse(Long userIdx, String userRole, String latitude, String longitude) {
        this.userIdx = userIdx;
        this.userRole = userRole;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}