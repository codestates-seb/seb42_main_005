package com.project.mainproject.stub;

import com.project.mainproject.review.dto.*;
import com.project.mainproject.review.dto.reply.PatchReplyDto;
import com.project.mainproject.review.dto.reply.PostReplyDto;
import com.project.mainproject.review.dto.reply.SimpleReplyDto;
import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.entity.ReviewImage;
import com.project.mainproject.review.entity.ReviewReply;
import com.project.mainproject.review.entity.ReviewReport;
import com.project.mainproject.review.enums.ReportStatus;
import com.project.mainproject.review.enums.ReviewStatus;
import com.project.mainproject.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ReviewStub {
    /*
    * ReviewController
    * */

    //request
    public static PostCreateReviewDto getPostCreateReviewStub() {
        return PostCreateReviewDto.builder()
                .content("리뷰 본문에 들어갈 내용입니다. 알약 가격이 다른곳보다 비싸요")
                .rating(2)
                .userIdx(1L)
                .storeIdx(1L)
                .build();
    }

    public static PostUpdateReviewDto getPostUpdateReviewStub() {
        return PostUpdateReviewDto.builder()
                .content("리뷰 본문을수정할 내용입니다.")
                .rating(4)
                .userIdx(1L)
                .storeIdx(2L)
                .build();
    }

    public static PostReviewReportDto getPostReviewReportStub() {
        return PostReviewReportDto.builder().userIdx(1L).reviewIdx(1L).content("신고 사유 입니다.").build();
    }


    //response
    public static ListGetStoreReviewDto getStoreReviewStub() {
        List<ListGetStoreReviewDto.StoreReviewDto> result = getStoreReviewListStub();
        return ListGetStoreReviewDto.builder().storeReviews(result).build();
    }

    public static List<ListGetStoreReviewDto.StoreReviewDto> getStoreReviewListStub() {
        List<ListGetStoreReviewDto.StoreReviewDto> result = new ArrayList<>();
        for (Long i = 1L; i < 3L; i++) {
            ListGetStoreReviewDto.StoreReviewDto build = ListGetStoreReviewDto.StoreReviewDto.builder()
                    .reviewIdx(1L)
                    .content("본문 내용이 들어갑니다.")
                    .rating(4)
                    .reviewImage("이미지 경로가 들어갑니다")
                    .userIdx(1L)
                    .userName("김복자")
                    .profileImage("사용자 프로필이미지 사진이 들어갑니다.")
                    .createdAt(LocalDateTime.now())
                    .modifiedAt(LocalDateTime.now())
                    .replies(getReplyStub())
                    .build();
            result.add(build);
        }
        return result;
    }

    //리뷰 작성, 수정에 응답으로 사용된다.
    public static SimpleReviewDto getSimpleReviewStub() {
        return SimpleReviewDto.builder()
                .reviewIdx(1L)
                .storeIdx(1L)
                .userIdx(1L)
                .build();
    }

    public static ListGetUserReviewDto getListGetUserReviewStub() {
        List<ListGetUserReviewDto.GetUserReviewDto> result = getGetUserReviewStubList();

        return ListGetUserReviewDto.builder().reviews(result).build();
    }

    public static List<ListGetUserReviewDto.GetUserReviewDto> getGetUserReviewStubList() {
        List<ListGetUserReviewDto.GetUserReviewDto> result = new ArrayList<>();

        for (Long i = 1L; i < 3L; i++) {
            ListGetUserReviewDto.GetUserReviewDto build = ListGetUserReviewDto.GetUserReviewDto.builder()
                    .reviewIdx(1L)
                    .storeName("약국이름")
                    .rating(4)
                    .modifiedAt(LocalDateTime.now())
                    .storeIdx(1L)
                    .content("이곳은 리뷰 본문입니다.")
                    .build();
            result.add(build);
        }
        return result;
    }

    /*
    * AdminReviewController
    * */

    //request
    //삭제 전용
    public static ReviewIdxDto getReviewIdxStub() {
        List<ReviewIdxDto.ReviewIdxs> result = new ArrayList<>();

        for (long i = 1L; i < 3; i++) {
            ReviewIdxDto.ReviewIdxs reviewIdxs = new ReviewIdxDto.ReviewIdxs(i);
            result.add(reviewIdxs);
        }
        return new ReviewIdxDto(result);
    }


    //response
    public static ListReportedReviewDto getListReportedReviewStub() {
        List<ListReportedReviewDto.ReportedReviewDto> result = new ArrayList<>();

        for (long i = 1L; i < 3; i++) {
            ListReportedReviewDto.ReportedReviewDto build = ListReportedReviewDto.ReportedReviewDto.builder()
                    .reviewIdx(i)
                    .reportCnt(2)
                    .email("aLong@gmail.com")
                    .createdAt(LocalDateTime.now())
                    .content("이곳은 신고 본문 내용입니다.")
                    .build();
            result.add(build);
        }
        return ListReportedReviewDto.builder().reportedReviews(result).build();
    }

    /*
    * ReviewReplyController
    * */

    //request

    public static PostReplyDto getPostReplyStub() {
        return PostReplyDto.builder().userIdx(1L)
                .storeIdx(2L)
                .content("본문입니다.")
                .reviewIdx(3L)
                .build();
    }

    public static PatchReplyDto getPatchReplyStub() {
        return PatchReplyDto.builder().replyIdx(1L).storeIdx(2L).userIdx(3L).reviewIdx(4L).content("이것은 수정할 본문 내용입니다.").build();
    }


    //response

    public static SimpleReplyDto getSimpleReplyStub() {
        return SimpleReplyDto.builder().replyIdx(1L).userIdx(2L).build();
    }


    //내부 동작 메서드
    private static List<ListGetStoreReviewDto.ReplyDto> getReplyStub() {
        List<ListGetStoreReviewDto.ReplyDto> result = new ArrayList<>();
        for (Long i = 1L; i < 3L; i++) {
            ListGetStoreReviewDto.ReplyDto build = ListGetStoreReviewDto.ReplyDto.builder()
                    .replyIdx(1L)
                    .content("리플 본문 입니다.")
                    .userIdx(1L)
                    .userName("김상구")
                    .profileImage("사용자 프로필 이미지")
                    .createdAt(LocalDateTime.now())
                    .build();
            result.add(build);
        }

        return result;
    }

    public static Review getReviewStub() {
        return Review.builder()
                .reviewIdx(1L)
                .content("이곳은 리뷰 본문입니다.")
                .reviewStatus(ReviewStatus.POSTED)
                .reviewImages(List.of(ReviewImage.builder().build()))
                .reviewReplies(List.of(ReviewReply.builder().build()))
                .rating(4)
                .user(getUserStub())
                .reportCnt(3)
                .build();
    }
    public static Review getReviewStub2() {
        return Review.builder()
                .reviewIdx(1L)
                .content("이곳은 리뷰 본문입니다.")
                .reviewStatus(ReviewStatus.POSTED)
                .reviewImages(List.of(ReviewImage.builder().build()))
                .reviewReplies(List.of(ReviewReply.builder().build()))
                .rating(4)
                .user(getUserStub())
                .reportCnt(3)
                .build();
    }

    public static ReviewReport getReviewReport() {
        return ReviewReport.builder()
                .reportIdx(1L)
                .reportStatus(ReportStatus.REGISTERED)
                .review(getReviewStub())
                .content("신고 사유 본문입니다.")
                .user(getUserStub())
                .build();

    }

    public static Page<Review> getPageReviewStub() {
        return new PageImpl<Review>(getListReviewStub());
    }

    public static List<Review> getListReviewStub() {
        return List.of(getReviewStub(),getReviewStub2());
    }

    public static User getUserStub() {
        return new User(1L,"12qwe123!@#qwe","admin@gmail.com","순대먹고시펑");
    }
}


