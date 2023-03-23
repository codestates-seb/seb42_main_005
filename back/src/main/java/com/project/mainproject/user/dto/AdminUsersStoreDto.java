package com.project.mainproject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminUsersStoreDto {

    private List<UserIdx> userIdxs;
    private List<StoreIdx> storeIdxs;

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class UserIdx {
        private Long userIdx;
    }
    @Getter
    public static class StoreIdx {
        private Long storeIdx;
    }
}