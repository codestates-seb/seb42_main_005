package com.project.mainproject.mail.event;

import com.project.mainproject.mail.EmailSender;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.mail.MailSendException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

@EnableAsync
@Configuration
@Component
@Slf4j
@RequiredArgsConstructor
public class UserSleepNotificationEventListener {

    private final EmailSender emailSender;
    private String subject = "휴면회원 전환 안내";
    private String templateName = "email-sleep-notification";

    @SneakyThrows
    @Async
    @EventListener
    public void listen(UserSleepNotificationApplicationEvent event) {
        try {
            String[] to = new String[]{event.getUser().getEmail()};

            String message =
                    event.getUser().getEmail() + " 회원님, " +
                    "1년 간 접속이 이루어지지 않아 휴면회원으로 전환되었습니다." +
                    "휴면회원 해제를 원하시면 로그인해주세요.";
            emailSender.sendEmail(to, subject, message, templateName);
        } catch (MailSendException e) {
            log.error("MailSendException L rollback for Member Registration :");
            e.printStackTrace();
            log.warn("메일 전송에 실패했습니다! 서버의 확인이 필요함");
            throw e;
        }
    }

}
