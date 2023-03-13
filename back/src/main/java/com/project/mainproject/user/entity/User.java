package com.project.mainproject.user.entity;

import com.project.mainproject.audit.Auditable;
import com.project.mainproject.user.enums.UserStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.GenerationType.IDENTITY;
import static javax.persistence.InheritanceType.JOINED;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Inheritance(strategy = JOINED)
@Table(name = "USERS")
@NoArgsConstructor(access = PROTECTED)
public class User extends Auditable {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long userIdx;

    private String userId;

    @Column(name = "USER_PASSWORD")
    private String password;
    @Column(name = "USER_EMAIL")
    private String email;
    @Column(name = "USER_NAME")
    private String name;
    private String profileImage;
    private UserStatus userStatus;
    private LocalDateTime lastConnectedDate;

    @ElementCollection(fetch = EAGER)
    @CollectionTable(name = "USER_ROLE", joinColumns = @JoinColumn(name = "USER_IDX"))
    private List<String> role;
    @Builder
    public User(String userId, String password, String email, String name) {
        this.userId = userId;
        this.password = password;
        this.email = email;
        this.name = name;
    }
    public User(User user) {
        this.userId = user.getUserId();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.name = user.getName();
    }


    //### 간단한 동작메서드 ###//

    // ###연관관계  편의 메서드 ###//



}
