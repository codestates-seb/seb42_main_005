package com.project.mainproject.user.entity;

import com.project.mainproject.store.entity.Store;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@SuperBuilder
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "USER_STORE")
public class Pharmacy extends User {
    private String businessCertificate;
    private String pharmacistCertificate;
    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "store_Idx")
    private Store store;
}
