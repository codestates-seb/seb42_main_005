package com.project.mainproject.review.service;

import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.repository.ReviewRepository;
import com.project.mainproject.tag.entity.ReviewTag;
import com.project.mainproject.tag.entity.Tag;
import com.project.mainproject.tag.repository.ReviewTagRepository;
import com.project.mainproject.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final TagRepository tagRepository;
    private final ReviewTagRepository reviewTagRepository;

    @Transactional
    public Review createReview(Review review) {
        verifyTags(review.getReviewTags());

        Review createdReview = reviewRepository.save(review);
        for (ReviewTag reviewTag : createdReview.getReviewTags()) {
            reviewTag.setReview(createdReview);
            reviewTagRepository.save(reviewTag);
        }

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

    public void deleteReview(Long reviewIdx) {
        // TODO: 작성자 검증 시점?
        reviewRepository.deleteById(reviewIdx);
    }

}