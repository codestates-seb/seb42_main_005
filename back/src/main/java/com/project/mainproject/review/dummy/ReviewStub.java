package com.project.mainproject.review.dummy;

import com.project.mainproject.review.dto.GetReportedReviewDto;
import com.project.mainproject.review.dto.StoreReviewPageDto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ReviewStub {

    public static List<GetReportedReviewDto> getReportedReviewDtoListStub() {
        List<GetReportedReviewDto> result = new ArrayList<>();
        for (long i = 1L; i < 16; i++) {
            GetReportedReviewDto build = GetReportedReviewDto.builder()
                    .reviewContent("신고 사유 " + i)
                    .reviewIdx(i)
                    .reportedCount((int) i)
                    .reviewCreatedAt(LocalDateTime.now())
                    .build();
            result.add(build);
        }
        return result;
    }

    public static List<StoreReviewPageDto> getStoreReviewPageListStub() {
        List<StoreReviewPageDto> result = new ArrayList<>();
        for (Long i = 1L; i < 20; i++) {
            StoreReviewPageDto build = StoreReviewPageDto.builder()
                    .reviewIdx(i)
                    .rating(4)
                    .content("내공 얌얌" + i)
                    .tags(List.of("신선함", "주차장이 넓어요", "친절함"))
                    .modifiedAt(LocalDateTime.now())
                    .createdAt(LocalDateTime.now())
                    .build();
            result.add(build);
        }
        return result;
    }

}
