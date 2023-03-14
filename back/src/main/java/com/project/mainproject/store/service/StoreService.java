package com.project.mainproject.store.service;

import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.repository.StoreRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class StoreService {
    private StoreRepository storeRepository;

    public Store getStoreDetail(Long storeIdx) {

        return validatedStoreIsExist(storeIdx);
    }




    //### 내부 동작 로직 ###//
    private Store validatedStoreIsExist(Long storeIdx) {
        Optional<Store> findOptionalStore = storeRepository.findById(storeIdx);

        if (!findOptionalStore.isPresent()) {
            throw new RuntimeException("약국이 존재하지 않습니다.");
        }//TODO : 예외 처리 브렌치가 PR 되면 예외를 변경한다.

        return findOptionalStore.get();
    }



}