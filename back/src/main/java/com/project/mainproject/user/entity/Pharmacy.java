package com.project.mainproject.user.entity;

import com.project.mainproject.user.enums.PharmacyStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

import static javax.persistence.EnumType.STRING;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Pharmacy extends User {
    private String businessCertificate;

    private String pharmacistCertificate;

    @Enumerated(value = STRING)
    private PharmacyStatus pharmacyStatus;

    @Builder
    public Pharmacy(String userId,
                    String password,
                    String email,
                    String name,
                    LocalDateTime DOB,
                    String businessCertificate,
                    String pharmacistCertificate,
                    PharmacyStatus pharmacyStatus) {
        super(userId, password, email, name, DOB);
        this.businessCertificate = businessCertificate;
        this.pharmacistCertificate = pharmacistCertificate;
        this.pharmacyStatus = pharmacyStatus;
    }

}
