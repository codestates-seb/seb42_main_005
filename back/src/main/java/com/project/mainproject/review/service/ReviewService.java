package com.project.mainproject.review.service;

import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.review.dto.DeleteReviewsDto;
import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.entity.ReviewImage;
import com.project.mainproject.review.repository.ReviewRepository;
import com.project.mainproject.utils.FileUploader;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.project.mainproject.review.enums.ReviewStatus.DELETED;
import static com.project.mainproject.review.enums.ReviewStatus.POSTED;
import static com.project.mainproject.review.exception.ReviewExceptionCode.REVIEW_NOT_EXIST;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public Page<Review> getReviews(Long storeIdx, Pageable pageable) {
        // TODO: 존재하는 약국 검증 추가 (StoreService)
        return reviewRepository.findAllByStoreStoreIdxAndReviewStatusOrderByCreatedAtDesc(
                storeIdx, POSTED, pageable);
    }

    @Transactional
    public Review saveReview(Review review, MultipartFile image) {
        Review createdReview = reviewRepository.save(review);
        if (image != null) saveReviewImage(image, createdReview);

        return createdReview;
    }

    @Transactional
    public Review updateReview(Review review) {
        Review updatedReview = reviewRepository.save(review);

        return updatedReview;
    }

    @Transactional
    public Review updateReview(Review review, MultipartFile image) {
        Review updatedReview = reviewRepository.save(review);
        updateReviewImage(image, updatedReview);

        return updatedReview;
    }

    @Transactional
    public void deleteReview(Long storeIdx, Long reviewIdx) {
        // TODO: 작성자 검증 시점?
        Review review = findVerifiedReview(storeIdx, reviewIdx);
        reviewRepository.delete(review);
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

    private void updateReviewImage(MultipartFile image, Review review) {
        deleteExistReviewImages(review);
        String uploadImagePath = "";
        if (image != null) {
            uploadImagePath = uploadImage(image);
        }
        review.updateReviewImage(uploadImagePath);
    }

    private String uploadImage(MultipartFile image) {
        return FileUploader.saveImage(image);
    }

    private void deleteExistReviewImages(Review review) {
        List<String> existImages = new ArrayList<>();
        for (ReviewImage existReviewImage : review.getReviewImages()){
            existImages.add(existReviewImage.getImagePath());
        }
        if (existImages.size() != 0) FileUploader.deleteImages(existImages);
    }

    public List<Review> getUserReviews(Long userIdx) {
        // TODO: 유저 검증 추가 (StoreService)
        return reviewRepository.findAllByUserUserIdxAndReviewStatusOrderByCreatedAtDesc(
                userIdx, POSTED);
    }

    public Page<Review> getReportedReviews(Pageable pageable) {
        int reportCnt = 3; // TODO: 수정 필요 (테스트용)
        return reviewRepository.findByReviewStatusAndReportCntGreaterThan(POSTED, reportCnt, pageable);
    }

    @Transactional
    public void deleteReportedReviews(DeleteReviewsDto deleteReviews) {
        List<Long> idxs =
                deleteReviews.getReviews().stream().map(el -> el.getReviewIdx()).collect(Collectors.toList());
        List<Review> reviews = reviewRepository.findAllById(idxs);
        if (reviews.size() != deleteReviews.getReviews().size()) throw new RuntimeException("잘못된 리뷰 ID");

        // 어떻ㄱㅔ ,,
        reviews.stream().forEach(review -> review.setReviewStatus(DELETED));
    }

}