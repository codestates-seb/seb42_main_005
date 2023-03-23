package com.project.mainproject.user.dto;

import com.project.mainproject.user.entity.Pharmacy;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
@Getter
@Builder
@AllArgsConstructor
public class PharmacyInfoDto {
    private Long userIdx;
    private Long storeIdx;
    private LocalDateTime createdAt;
    private String name;
    private String email;
    private String address;
    private String businessCertificate;
    private String pharmacistCertificate;

    public PharmacyInfoDto(Pharmacy pharmacy) {
        this.userIdx = pharmacy.getUserIdx();
        this.createdAt = pharmacy.getCreatedAt();
        this.name = pharmacy.getName();
        this.email = pharmacy.getEmail();
        this.address = pharmacy.getAddress();
        this.businessCertificate = pharmacy.getBusinessCertificate();
        this.pharmacistCertificate = pharmacy.getPharmacistCertificate();
        this.storeIdx = pharmacy.getStore().getStoreIdx();
    }
}
