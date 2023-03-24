package com.project.mainproject.review.service;

import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.review.dto.ReviewIdxDto;
import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.repository.ReviewRepository;
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
import static com.project.mainproject.review.enums.ReviewStatus.DELETED;
import static com.project.mainproject.review.enums.ReviewStatus.POSTED;
import static com.project.mainproject.review.exception.ReviewExceptionCode.REVIEW_NOT_EXIST;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final FileUploader fileUploader;

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

//    리뷰 수정 기존 로직
//    @Transactional
//    public Review updateReview(Review review, MultipartFile image) {
//        Review updatedReview = reviewRepository.save(review);
//        updateReviewImage(image, updatedReview);
//
//        return updatedReview;
//    }
//
//    private void updateReviewImage(MultipartFile image, Review review) {
//        deleteExistReviewImages(review);
//        String uploadImagePath = "";
//        if (image != null) {
//            uploadImagePath = uploadImage(image);
//        }
//        review.updateReviewImage(uploadImagePath);
//    }
//
//    private void deleteExistReviewImages(Review review) {
//        List<String> existImages = new ArrayList<>();
//        for (ReviewImage existReviewImage : review.getReviewImages()){
//            existImages.add(existReviewImage.getImagePath());
//        }
//        if (existImages.size() != 0) FileUploader.deleteImages(existImages);
//    }

    @Transactional
    public void deleteReview(Long storeIdx, Long reviewIdx) {
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

    private String uploadImage(MultipartFile image) {
        return fileUploader.saveImage(image, "review");
    }

    public List<Review> getUserReviews(Long userIdx) {
        // TODO: 유저 검증 추가 (StoreService)
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
    public void deleteReportedReviews(ReviewIdxDto deleteReviewIdxs) {
        List<Long> idxs =
                deleteReviewIdxs.getReviews().stream().map(el -> el.getReviewIdx()).collect(Collectors.toList());
        List<Review> reviews = reviewRepository.findAllById(idxs);
        if (reviews.size() != deleteReviewIdxs.getReviews().size())
            throw new BusinessLogicException(REVIEW_NOT_EXIST);

        reviews.stream().forEach(review -> review.changeReportStatus(SUCCESS));
        reviews.stream().forEach(review -> review.setReviewStatus(DELETED));
    }

    /*
        신고 누적 리뷰(블라인드) 복원
        1. 신고 내역의 상태 -> REJECTED
        2. 리뷰 상태 -> POSTED
     */
    @Transactional
    public void recoverReportedReviews(ReviewIdxDto recoverReviewIdxs) {
        List<Long> idxs =
                recoverReviewIdxs.getReviews().stream().map(el -> el.getReviewIdx()).collect(Collectors.toList());
        List<Review> reviews = reviewRepository.findAllByIdAndReviewStatus(idxs, POSTED); // TODO: BLINDED로 바꾸기
        if (reviews.size() != recoverReviewIdxs.getReviews().size())
            throw new BusinessLogicException(REVIEW_NOT_EXIST);

        reviews.stream().forEach(review -> review.changeReportStatus(REJECTED));
        reviews.stream().forEach(review -> review.setReviewStatus(POSTED));
    }

}