package com.project.mainproject.store.service;

import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.exception.StoreExceptionCode;
import com.project.mainproject.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StoreValidService {
    private final StoreRepository storeRepository;

    public Store storeValidation(Long storeIdx) {
        Optional<Store> findStore = storeRepository.findById(storeIdx);

        if (!findStore.isPresent()) {
            throw new BusinessLogicException(StoreExceptionCode.STORE_NOT_FOUND);
        }
        return findStore.get();
    }
}
