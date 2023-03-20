package com.project.mainproject.store.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class StoreImage {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long storeImageIdx;

    private String imagePath;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "STORE_IDX")
    private Store store;
}
