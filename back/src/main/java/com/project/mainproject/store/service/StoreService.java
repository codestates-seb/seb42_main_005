package com.project.mainproject.store.service;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.enums.ResultStatus;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.repository.StoreQueryRepository;
import com.project.mainproject.user.entity.Normal;
import com.project.mainproject.user.entity.PickedStore;
import com.project.mainproject.user.repository.PickedStoreRepository;
import com.project.mainproject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class StoreService {
    private final StoreQueryRepository storeQueryRepository;
    private final PickedStoreRepository pickedStoreRepository;
    private final UserService userService;

    public SingleResponseDto pickStore(Long userIdx, Long storeIdx) {
        Normal findUser = (Normal) userService.validUser(userIdx);    //user 가 존재하는지 먼저 검증 시큐리티 적용 후 필요 없음
        Store findStore = storeQueryRepository.findStoreById(storeIdx);
        List<PickedStore> findPickedStores = storeQueryRepository.findPickedStoreById(storeIdx);    //store에 이미 존재

        for (PickedStore pickedStore : findPickedStores) {
            if (pickedStore.getNormal().getUserIdx().equals(userIdx)) {
                pickedStore.removePickedStore(findUser, findStore);
                findPickedStores.remove(pickedStore);
                pickedStoreRepository.delete(pickedStore);

                return SingleResponseDto.builder()
                        .message(ResultStatus.DELETE_COMPLETED.getMessage())
                        .httpCode(ResultStatus.DELETE_COMPLETED.getHttpCode())
                        .build();
            }
        }

        PickedStore pickedStore = PickedStore.builder()
                .storeId(findStore.getHpid())
                .store(findStore)
                .normal(findUser).build();

        findPickedStores.add(pickedStore);
        pickedStore.addPickedStore(findUser,findStore);

        pickedStoreRepository.save(pickedStore);

        return SingleResponseDto.builder()
                .message(ResultStatus.PROCESS_COMPLETED.getMessage())
                .httpCode(ResultStatus.PROCESS_COMPLETED.getHttpCode())
                .build();
    }


}