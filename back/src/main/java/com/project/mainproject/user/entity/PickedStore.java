package com.project.mainproject.user.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name = "PICKED_STORE")
@NoArgsConstructor(access = PROTECTED)
public class PickedStore {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long pickedStoreId;

    private String storeId;

    @ManyToOne(fetch = LAZY)
    private Normal normal;

}
