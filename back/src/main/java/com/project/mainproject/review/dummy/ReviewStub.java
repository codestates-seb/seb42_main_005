package com.project.mainproject.review.dummy;

import com.project.mainproject.review.dto.GetReportedReviewDto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ReviewStub {

    public static List<GetReportedReviewDto> getReportedReviewDtoList() {
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

    public static
}
