package com.project.mainproject.user.dto.db;

import com.project.mainproject.user.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.usertype.UserType;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class DBUserInfo {
    private Long userIdx;
    private LocalDateTime createdAt;
    private String name;
    private String email;
    private String address;
    private String imagePath;
    private String userType;
    private UserStatus userStatus;
    private Long reviewCount;
    private Long reportCount;
    private LocalDateTime bannedUserRestoredDate;
}
