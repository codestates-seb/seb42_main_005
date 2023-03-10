package com.project.mainproject.store.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class StoreImage {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long stareImageIdx;
    private String imagePath;
}
