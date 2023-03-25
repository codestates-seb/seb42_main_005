package com.project.mainproject.user.entity;

import com.project.mainproject.VO.Duration;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@NoArgsConstructor(access = PROTECTED)
public class UserBanned {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long bannedId;

    @Embedded
    private Duration duration;

    @OneToOne(fetch = EAGER)
    @JoinColumn(name = "user_idx")
    private User user;

    @Builder
    public UserBanned(Duration duration, User user) {
        this.duration = duration;
        this.user = user;
    }
}
