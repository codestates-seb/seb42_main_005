package com.project.mainproject.scheduler.user;

import com.project.mainproject.mail.event.UserSleepNotificationApplicationEvent;
import com.project.mainproject.user.entity.User;
import com.project.mainproject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserScheduler {

    private final UserRepository userRepository;
    private final ApplicationEventPublisher publisher;

    @Scheduled(cron = "0 0 * * * *")
    @Transactional
    public void changeUserStatusToSleep() {
        List<User> users = findSleepUsers();
        List<Long> sleepUsersIdx = sendSleepNotificationMail(users);
        int sleepCount = updateUserStatus(sleepUsersIdx);

        log.info(sleepCount + "개의 계정이 휴면 처리 되었습니다.");
    }

    private List<User> findSleepUsers() {
        LocalDateTime beforeOneYear = LocalDateTime.now().minusYears(1);
        return userRepository.findByLastConnectedDateGreaterThan(beforeOneYear);
    }

    private List<Long> sendSleepNotificationMail(List<User> users) {
        List<Long> sleepUsersIdx = new ArrayList<>();
        for (User user : users) {
            publisher.publishEvent(new UserSleepNotificationApplicationEvent(this, user));
            sleepUsersIdx.add(user.getUserIdx());
        }
        return sleepUsersIdx;
    }

    private int updateUserStatus(List<Long> sleepUsersIdx) {
        return userRepository.UpdateUserStatusByUserIdx(sleepUsersIdx);
    }

}
