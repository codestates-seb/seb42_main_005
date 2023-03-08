package com.project.mainproject.user.entity;

import com.project.mainproject.VO.Duration;
import com.project.mainproject.medicine.entity.Medicine;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class UserMedicine {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long userMedicineIdx;

    private String takingCount;

    private String takingTime;

    @Embedded
    private Duration duration;
    
    
    //### 연관관계 매핑 ###
    @ManyToOne(fetch = LAZY)
    private User user;

    @ManyToOne(fetch = LAZY)
    private Medicine medicine;

    //### 간단한 동작메서드 ###//


    // ###연관관계  편의 메서드 ###//

}
