package com.project.mainproject.user.entity;

import com.project.mainproject.audit.Auditable;
import com.project.mainproject.review.entity.Review;
import com.project.mainproject.user.enums.UserStatus;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static javax.persistence.InheritanceType.JOINED;

@SuperBuilder
@Entity
@Getter
@Setter
@Inheritance(strategy = JOINED)
@NoArgsConstructor
@ToString
@Table(name = "USERS")
public class User extends Auditable{
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long userIdx;
    @Column(name = "USER_PASSWORD")
    private String password;
    @Column(name = "USER_EMAIL")
    @Email
    private String email;
    @Column(name = "USER_NAME")
    @NotBlank
    private String name;
    @Column(name = "USER_ADDRESS")
    @NotBlank
    private String address;
    private String imagePath;
    private String userType;
    @Enumerated(value = STRING)
    @Builder.Default
    private UserStatus userStatus = UserStatus.ACTIVE;
    private LocalDateTime lastConnectedDate;
    @ElementCollection(fetch = EAGER)
    @CollectionTable(name = "USER_ROLE", joinColumns = @JoinColumn(name = "USER_IDX"))
    private List<String> role;
    @OneToMany(mappedBy = "user")
    private List<Review> reviews = new ArrayList<>();

    @OneToOne(mappedBy = "user",fetch = LAZY)
    private UserBanned userBanned;

    @Builder // For Mapper
    public User(Long userIdx) {
        this.userIdx = userIdx;
    }

    @Builder
    public User(Long userIdx, String password, String email, String name) {
        this.userIdx = userIdx;
        this.password = password;
        this.email = email;
        this.name = name;
    }
    @Builder
    public User(User user) {
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.name = user.getName();
    }



    //### 간단한 동작메서드 ###//
    public String getRole() {
        String role = "";
        if (role.contains("ADMIN")) role = "관리자";
        else if (role.contains("PHARMACY")) role = "약국회원";
        else role = "일반회원";
        return role;
    }

    public Integer getReportCount() {
        return this.reviews.stream().map(Review::getReportCnt).reduce(Integer::sum).orElse(0);
    }

    public long getReviewCount() {
        return Optional.of(this.reviews.size()).orElse(0);
    }

    // ###연관관계  편의 메서드 ###//



}
