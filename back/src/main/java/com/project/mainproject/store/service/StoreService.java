package com.project.mainproject.store.service;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.enums.ResultStatus;
import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.entity.StoreImage;
import com.project.mainproject.store.repository.StoreQueryRepository;
import com.project.mainproject.user.entity.Normal;
import com.project.mainproject.user.entity.Pharmacy;
import com.project.mainproject.user.entity.PickedStore;
import com.project.mainproject.user.exception.UserExceptionCode;
import com.project.mainproject.user.repository.PickedStoreRepository;
import com.project.mainproject.user.service.UserService;
import com.project.mainproject.utils.FileUploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class StoreService {
    private final StoreQueryRepository storeQueryRepository;
    private final PickedStoreRepository pickedStoreRepository;
    private final UserService userService;
    private final FileUploader fileUploader;

    public SingleResponseDto pickStore(Long storeIdx, Long loginUserIdx) {
        if (loginUserIdx.equals(-1)) {
            throw new BusinessLogicException(UserExceptionCode.USER_MISS_MATCH);
        }
        Normal findUser = userService.checkIsNormal(loginUserIdx);
        Store findStore = storeQueryRepository.findStoreById(storeIdx);
        List<PickedStore> findPickedStores = storeQueryRepository.findPickedStoreById(storeIdx);    //store에 이미 존재

        for (PickedStore pickedStore : findPickedStores) {
            if (pickedStore.getNormal().getUserIdx().equals(loginUserIdx)) {
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

    /*
     * UserIdx를 이용해서 Store -> StoreImage를 저장하는 로직 수행
     * 1. User단에서 약사인지 Check -> Store 존재하는지 Check
     * */
    public SingleResponseDto updateImage(Long userIdx, MultipartFile multipartFile) {
        Pharmacy pharmacy = userService.checkIsPharmacy(userIdx);
        Store findStore = pharmacy.getStore();
        StoreImage storeImages = findStore.getStoreImages();
        String uploadImagePath = "";
        if (storeImages == null) {
            uploadImagePath = fileUploader.saveImage(multipartFile,"storeImage");
            StoreImage storeImage = StoreImage.builder().imagePath(uploadImagePath).store(findStore).build();

            findStore.addStoreImage(storeImage);
        } else {
            String deleteImagePath = storeImages.getImagePath();
            uploadImagePath = fileUploader.patchImage(multipartFile, deleteImagePath,"storeImage");
            findStore.getStoreImages().setImagePath(uploadImagePath);
        }



        return SingleResponseDto.builder()
                .message(ResultStatus.CREATE_COMPLETED.getMessage())
                .httpCode(ResultStatus.CREATE_COMPLETED.getHttpCode())
                .build();
    }

}