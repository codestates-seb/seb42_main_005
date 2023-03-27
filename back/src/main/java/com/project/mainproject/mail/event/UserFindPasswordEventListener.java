package com.project.mainproject.mail.event;

import com.project.mainproject.mail.EmailSender;
import com.project.mainproject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
public class UserFindPasswordEventListener {
    @Value("${mail.subject.member.registration}")
    private String subject;

    @Value("${mail.template.name.member.join}")
    private String templateName;

    private final EmailSender emailSender;
    private final UserService userService;

    @SneakyThrows
    @Async
    @EventListener
    public void listen(UserFindPasswordApplicationEvent event) {
        try {
            String[] to = new String[]{event.getUser().getEmail()};

            String tmpPassword = event.getNewPassword();

            String message = event.getUser().getEmail() + "임시 비밀번호는 " + tmpPassword + " 입니다." +"\n로그인 후 비밀번호 변경해 주시기 바랍니다.";
            emailSender.sendEmail(to, subject, message, templateName);
        } catch (MailSendException e) {
            log.error("MailSendException L rollback for Member Registration :");
            e.printStackTrace();
            log.warn("메일 전송에 실패했습니다! 서버의 확인이 필요함");
            throw e;
        }
    }
}
