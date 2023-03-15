package com.project.mainproject.user.entity;

import com.project.mainproject.VO.Duration;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    @ManyToOne(fetch = LAZY)
    private User user;
}
