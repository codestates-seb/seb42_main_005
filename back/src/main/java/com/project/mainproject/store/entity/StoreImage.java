package com.project.mainproject.store.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Setter
    private String imagePath;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "STORE_IDX")
    private Store store;

    @Builder
    public StoreImage( String imagePath, Store store) {
        this.imagePath = imagePath;
        this.store = store;
    }
}
