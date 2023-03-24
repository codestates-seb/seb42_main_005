package com.project.mainproject.user.repository;

import com.project.mainproject.user.entity.Pharmacy;
import com.project.mainproject.user.enums.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {
    Pharmacy findByEmail(String email);

    Page<Pharmacy> findAllByUserStatusIs(UserStatus userStatus, Pageable pageable);
}
