package com.project.mainproject.medicine.entity;

import com.project.mainproject.medicine.enums.TakingTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.EnumType.STRING;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Medicine {
    @Id
    @GeneratedValue
    private Long medicineIdx;

    private String name;

    private String takingCount;

    @Enumerated(STRING)
    private TakingTime takingTime;

    @Lob
    private String description;
}
