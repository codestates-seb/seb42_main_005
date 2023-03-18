package com.project.mainproject.store.service;

import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.repository.StoreRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StoreValidService {
    private StoreRepository storeRepository;

    protected Store storeValidation(Long storeIdx) {
        Optional<Store> findStore = storeRepository.findById(storeIdx);

        if (!findStore.isPresent()) {
            throw new RuntimeException("약국이 존재하지 않습니다.");
        }
        return findStore.get();
    }
}
