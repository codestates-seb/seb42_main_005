package com.project.mainproject.mail;

import org.springframework.stereotype.Component;

@Component
public interface EmailSendable {
    void send(String[] to, String subject, String message, String templateName) throws InterruptedException;
}
