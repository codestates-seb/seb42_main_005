package com.project.mainproject.user.dummy;

import com.project.mainproject.user.dto.AdminUsersStoreDto;
import com.project.mainproject.user.dto.BannedReviewsDto;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class AdminStub {
    public static AdminUsersStoreDto getAdminUsers() {
        List<AdminUsersStoreDto.UserIdx> users = new ArrayList<>();
        for(Long l = 1L; l < 11; l++) {
            users.add(new AdminUsersStoreDto.UserIdx(l));
        }
        return AdminUsersStoreDto.builder().userIdxs(users).build();
    }

    public static BannedReviewsDto getBannedReviewsStub() {
        List<BannedReviewsDto.ReviewIdx> reviews = new ArrayList<>();
        for(Long l = 1L; l < 11; l++) {
            reviews.add(new BannedReviewsDto.ReviewIdx(l));
        }
        return BannedReviewsDto.builder().reviews(reviews).build();
    }
}
