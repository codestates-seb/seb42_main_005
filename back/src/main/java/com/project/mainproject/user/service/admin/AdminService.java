package com.project.mainproject.user.service.admin;

import com.project.mainproject.VO.Duration;
import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.user.entity.User;
import com.project.mainproject.user.entity.UserBanned;
import com.project.mainproject.user.enums.UserStatus;
import com.project.mainproject.user.exception.UserExceptionCode;
import com.project.mainproject.user.repository.UserBannedRepository;
import com.project.mainproject.user.repository.UserRepository;
import com.project.mainproject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final UserService userService;
    private final UserBannedRepository userBannedRepository;

    public void approvalPharmacy(List<Long> userIdxs) {
        List<User> findUsers = userRepository.findByIds(userIdxs);

        checkUserExist(userIdxs, findUsers);
        for (int i = 0; i < findUsers.size(); i++) {
            User user = findUsers.get(i);
            userService.checkIstPharmacy(user);
            user.setUserStatus(UserStatus.ACTIVE);
            //TODO: user.setUserType 찍어야한다.
        }
    }

    public void rejectPharmacy(List<Long> userIdx) {
        // 유저 검증 필요 (아무 숫자나 다 됨 => TEMPORARY인 "약국회원")
        userRepository.deleteUserByIdList(userIdx);
    }

    public void blockUsers(int period, List<Long> userIdxs) {

        List<User> findUsers = userRepository.findByIds(userIdxs);
        checkUserExist(userIdxs, findUsers);

        for (User findUser : findUsers) {
            findUser.setUserStatus(UserStatus.SUSPENDED);
            UserBanned userBanned = UserBanned.builder().user(findUser).duration(selectDuration(period)).build();
            userBannedRepository.save(userBanned);
        }
    }

    public void banishUsers(List<Long> userIdxs) {
        List<User> findUsers = userRepository.findByIds(userIdxs);
        findUsers.iterator().forEachRemaining(findUser -> findUser.setUserStatus(UserStatus.KICKEDOUT));
    }

    public void restoreUsers(List<Long> userIdxs) {
        List<User> findUsers = userRepository.findByIds(userIdxs);

        for (User findUser : findUsers) {
            findUser.setUserStatus(UserStatus.ACTIVE);
        }

        userBannedRepository.usersDelete(userIdxs); //벤당한 유저 삭제로직
    }

    // 내부 동작 메서드

    private void checkUserExist(List<Long> userIdxs, List<User> findUsers) {
        if (findUsers.size() != userIdxs.size()) {
            throw new BusinessLogicException(UserExceptionCode.USER_NOT_FOUND);
        }
    }

    private Duration selectDuration(int period) {
        return Duration.builder().startDate(LocalDateTime.now())
                .endDate(LocalDateTime.now().plusDays(period)).build();
    }
}
