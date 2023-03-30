package com.project.mainproject.user.entity;

import com.project.mainproject.store.entity.Store;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Table(name = "PICKED_STORE")
@NoArgsConstructor
public class PickedStore {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long pickedStoreIdx;

    private String storeId;
    //혹시 storeId 만든 이유가 무엇인가요 ?

    //연관관계 매핑
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_IDX")
    private Normal normal;

    @ManyToOne(fetch =LAZY)
    @JoinColumn(name = "STORE_IDX")
    private Store store;

    @Builder
    public PickedStore(String storeId, Normal normal, Store store) {
        this.storeId = storeId;
        this.normal = normal;
        this.store = store;
    }

    //### 연관관계 편의 메서드 ###
    public void addPickedStore(Normal normal, Store store) {
        this.normal = normal;
        this.store = store;

        normal.getPickedStores().add(this);
        store.getPickedStores().add(this);
    }

    public void removePickedStore(Normal normal, Store store) {
        normal.getPickedStores().remove(this);
        store.getPickedStores().remove(this);
    }
}
