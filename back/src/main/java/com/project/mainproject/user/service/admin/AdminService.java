package com.project.mainproject.user.service.admin;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.enums.ResultStatus;
import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.repository.StoreQueryRepository;
import com.project.mainproject.user.entity.Pharmacy;
import com.project.mainproject.user.entity.User;
import com.project.mainproject.user.enums.UserStatus;
import com.project.mainproject.user.exception.UserExceptionCode;
import com.project.mainproject.user.repository.UserRepository;
import com.project.mainproject.user.service.UserService;
import com.project.mainproject.utils.FileUploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.project.mainproject.enums.ResultStatus.*;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final UserService userService;
    private final StoreQueryRepository storeQueryRepository;

    public SingleResponseDto approvalPharmacy(List<Long> userIdxs) {
        List<User> findUsers = userRepository.findByIds(userIdxs);


        if (findUsers.size() != userIdxs.size()) {
            throw new BusinessLogicException(UserExceptionCode.USER_NOT_FOUND);
        }
        for (int i = 0; i < findUsers.size(); i++) {
            User user = findUsers.get(i);
            userService.checkIstPharmacy(user);
            user.setUserStatus(UserStatus.ACTIVE);
            //TODO: user.setUserType 찍어야한다.
        }

        return SingleResponseDto.builder()
                .message(PROCESS_COMPLETED.getMessage())
                .httpCode(PROCESS_COMPLETED.getHttpCode())
                .build();
    }

    public SingleResponseDto rejectPharmacy(List<Long> userIdx) {
        userRepository.deleteUserByIdList(userIdx);

        return SingleResponseDto.builder()
                .message(REJECT_PHARMACY.getMessage())
                .httpCode(REJECT_PHARMACY.getHttpCode())
                .build();
    }

    public SingleResponseDto blockUsers(int period, List<Long> userIdxs) {

        return null;
    }
}
