package com.project.mainproject.review.service;

import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.entity.ReviewImage;
import com.project.mainproject.review.repository.ReviewImageRepository;
import com.project.mainproject.review.repository.ReviewRepository;
import com.project.mainproject.tag.entity.ReviewTag;
import com.project.mainproject.tag.entity.Tag;
import com.project.mainproject.tag.repository.ReviewTagRepository;
import com.project.mainproject.tag.repository.TagRepository;
import com.project.mainproject.utils.FileUploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

import static com.project.mainproject.review.exception.ReviewExceptionCode.REVIEW_NOT_EXIST;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final TagRepository tagRepository;
    private final ReviewTagRepository reviewTagRepository;
    private final ReviewImageRepository reviewImageRepository;

    @Transactional
    public Review createReview(Review review, MultipartFile image) { // TODO: IMAGE UPLOAD
        verifyTags(review.getReviewTags());

        Review createdReview = reviewRepository.save(review);
        saveReviewTags(createdReview);
        saveReviewImage(image, createdReview);

        return createdReview;
    }

    private void verifyTags(List<ReviewTag> reviewTags) {
        List<Long> tagIds = getTags(reviewTags);
        List<Tag> tags = tagRepository.findAllById(tagIds);
        if (tags.size() != reviewTags.size()) throw new RuntimeException("잘못된 태그");
    }

    private List<Long> getTags(List<ReviewTag> reviewTags) {
        return reviewTags.stream()
                .map(reviewTag -> reviewTag.getTag().getTagIdx())
                .collect(Collectors.toList());
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

    private void saveReviewTags(Review review) {
        for (ReviewTag reviewTag : review.getReviewTags()) {
            reviewTag.setReview(review);
            reviewTagRepository.save(reviewTag);
        }
    }

    private void saveReviewImage(MultipartFile image, Review review) {
        String uploadImagePath = uploadImage(image);
        ReviewImage reviewImage = ReviewImage.builder()
                .imagePath(uploadImagePath)
                .review(review)
                .build();
        reviewImageRepository.save(reviewImage);
    }

    private String uploadImage(MultipartFile image) {
        return FileUploader.saveFile(image);
    }
}