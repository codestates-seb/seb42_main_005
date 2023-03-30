package com.project.mainproject.review.entity;

import com.project.mainproject.audit.Auditable;
import com.project.mainproject.user.entity.User;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
public class ReviewReply extends Auditable {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "review_reply_idx")
    private Long replyIdx;

    @Column(length = 1000)
    private String content;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_IDX")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "REVIEW_IDX")
    private Review review;

}
