package com.project.mainproject.review.entity;

import com.project.mainproject.review.enums.VoteType;
import com.project.mainproject.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name = "VOTE")
@NoArgsConstructor(access = PROTECTED)
public class Vote {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long voteIdx;

    @Enumerated(value = STRING)
    private VoteType voteType;
    
    @ManyToOne(fetch = LAZY)
    private User user;

    @ManyToOne(fetch = LAZY)
    private Review review;

    //### 간단한 동작메서드 ###//

    // ###연관관계  편의 메서드 ###//

}
