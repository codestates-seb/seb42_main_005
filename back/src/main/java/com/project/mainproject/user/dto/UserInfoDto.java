package com.project.mainproject.user.dto;

import com.project.mainproject.user.entity.User;
import com.project.mainproject.user.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class UserInfoDto {

    private Long userIdx;
    private LocalDateTime createdAt;
    private String name;
    private String email;
    private String address;
    private String imagePath;
    private String userType;
    private UserStatus userStatus;
    private long reviewCount;
    private int reportCount;

    public UserInfoDto(User user) {
        this.userIdx = user.getUserIdx();
        this.createdAt = user.getCreatedAt();
        this.name = user.getName();
        this.email = user.getEmail();
        this.address = user.getAddress();
        this.imagePath = user.getImagePath();
        this.userType = user.getUserType();
        this.userStatus = user.getUserStatus();
        this.reviewCount = user.getReviewCount();
        this.reportCount = user.getReportCount();
    }
}
