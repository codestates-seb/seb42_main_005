package com.project.mainproject.user.entity;

import com.project.mainproject.store.entity.Store;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name = "PICKED_STORE")
@NoArgsConstructor
public class PickedStore {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long pickedStoreId;

    private String storeId;

    //연관관계 매핑
    @ManyToOne(fetch = LAZY)
    private Normal normal;

    @ManyToOne(fetch =LAZY)
    private Store store;
}
