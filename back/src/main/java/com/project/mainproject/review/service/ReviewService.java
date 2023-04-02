package com.project.mainproject.review.service;

import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.review.dto.ReviewIdxDto;
import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.repository.ReviewRepository;
import com.project.mainproject.store.service.StoreValidService;
import com.project.mainproject.utils.FileUploader;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.project.mainproject.review.enums.ReportStatus.REJECTED;
import static com.project.mainproject.review.enums.ReportStatus.SUCCESS;
import static com.project.mainproject.review.enums.ReviewStatus.*;
import static com.project.mainproject.review.exception.ReviewExceptionCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final StoreValidService storeService;
    private final FileUploader fileUploader;

    public List<Review> getReviews(Long storeIdx) {
        storeService.storeValidation(storeIdx);
        return reviewRepository.findAllByStoreStoreIdxAndReviewStatusNotOrderByCreatedAtDesc(
                storeIdx, DELETED);
    }

    @Transactional
    public Review saveReview(Review review, MultipartFile image) {
        if (isValidRating(review.getRating()))
            throw new BusinessLogicException(RATING_NOT_VALID);
        Review createdReview = reviewRepository.save(review);
        if (image != null) saveReviewImage(image, createdReview);

        return createdReview;
    }

    private boolean isValidRating(int rating) {
        return rating < 0 || rating > 5;
    }

    @Transactional
    public Review updateReview(Review review, Long loginUserIdx) {
        validWriter(loginUserIdx, review);
        Review updatedReview = reviewRepository.save(review);

        return updatedReview;
    }

    @Transactional
    public void deleteReview(Long storeIdx, Long reviewIdx, Long loginUserIdx) {
        Review review = findVerifiedReview(storeIdx, reviewIdx);
        validWriter(loginUserIdx, review);
        review.setReviewStatus(DELETED);

        if (review.getReviewImages().size() != 0)
            fileUploader.deleteS3Image(review.getReviewImages().get(0).getImagePath());
        review.deleteReviewImage();
    }

    public Review findVerifiedReview(Long storeIdx, Long reviewIdx) {
        return reviewRepository.findByStoreStoreIdxAndReviewIdx(storeIdx, reviewIdx)
                .orElseThrow(() -> new BusinessLogicException(REVIEW_NOT_EXIST));
    }

    public void verifyReview(Long storeIdx, Long reviewIdx) {
        Optional<Review> review = reviewRepository.findByStoreStoreIdxAndReviewIdx(storeIdx, reviewIdx);
        if (review.isEmpty()) throw new BusinessLogicException(REVIEW_NOT_EXIST);
    }

    private void saveReviewImage(MultipartFile image, Review review) {
        String uploadImagePath = uploadImage(image);
        review.addReviewImage(uploadImagePath);
    }

    private String uploadImage(MultipartFile image) {
        return fileUploader.saveImage(image, "review");
    }

    public List<Review> getUserReviews(Long userIdx) {
        return reviewRepository.findAllByUserUserIdxAndReviewStatusOrderByCreatedAtDesc(
                userIdx, POSTED);
    }

    /*
        신고 리뷰(신고 한 개 이상) 조회
        - POSTED, BLINDED 리뷰 모두 포함
    */
    public Page<Review> getReportedReviews(Pageable pageable) {
        int reportCnt = 0;
        return reviewRepository.findByReviewStatusNotAndReportCntGreaterThan(DELETED, reportCnt, pageable);
    }

    /*
        신고 리뷰(신고 한 개 이상) 삭제
        1. 신고 내역의 상태 -> SUCCESS
        2. 리뷰 상태 -> DELETED
    */
    @Transactional
    public void deleteReportedReviews(ReviewIdxDto deleteReviewsIdx) {
        List<Long> idxs =
                deleteReviewsIdx.getReviewIdxs().stream().map(el -> el.getReviewIdx()).collect(Collectors.toList());
        List<Review> reviews = reviewRepository.findAllById(idxs);
        if (reviews.size() != deleteReviewsIdx.getReviewIdxs().size())
            throw new BusinessLogicException(REVIEW_NOT_EXIST);

        reviews.stream().forEach(review -> review.changeReportStatus(SUCCESS));
        reviews.stream().forEach(review -> review.setReviewStatus(DELETED));
    }

    /*
        신고 누적 리뷰(블라인드: 신고 열 개 이상) 복원
        1. 신고 내역의 상태 -> REJECTED
        2. 리뷰 상태 -> POSTED
     */
    @Transactional
    public void recoverReportedReviews(ReviewIdxDto recoverReviewsIdx) {
        List<Long> reviewsIdx = recoverReviewsIdx.getReviews().stream()
                                            .map(el -> el.getReviewIdx())
                                            .collect(Collectors.toList());
        List<Review> reviews = reviewRepository.findAllByIdAndReviewStatus(reviewsIdx, BLINDED);
        if (reviews.size() != recoverReviewsIdx.getReviews().size())
            throw new BusinessLogicException(REVIEW_NOT_BLINDED);

        reviews.stream().forEach(review -> review.changeReportStatus(REJECTED));
        reviews.stream().forEach(review -> review.setReviewStatus(POSTED));
    }

    private void validWriter(Long loginUserIdx, Review review) {
        if (loginUserIdx != review.getUser().getUserIdx())
            throw new BusinessLogicException(WRITER_MISS_MATCH);
    }

}