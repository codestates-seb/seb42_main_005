package com.project.mainproject.store.service;

import com.project.mainproject.store.repository.StoreRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class StoreService {
    private StoreRepository storeRepository;






    //### 내부 동작 로직 ###//




}