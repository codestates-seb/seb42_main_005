package com.project.mainproject.user.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.Table;
@SuperBuilder
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "USER_STORE")
public class Pharmacy extends User {
    private String businessCertificate;
    private String pharmacistCertificate;


//    @Builder
    public Pharmacy(String password,
                    String email,
                    String name,
                    String businessCertificate,
                    String pharmacistCertificate) {
        super(password, email, name);
        this.businessCertificate = businessCertificate;
        this.pharmacistCertificate = pharmacistCertificate;
    }

}
