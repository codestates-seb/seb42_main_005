package com.project.mainproject.store.repository;

import com.project.mainproject.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByNameContainingAndAddressContaining(String storeName, String storeAddress);
    List<Store> findByNameContaining(String storeName);
}