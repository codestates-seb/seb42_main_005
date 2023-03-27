package com.project.mainproject.mail.event;

import com.project.mainproject.user.entity.User;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class UserFindPasswordApplicationEvent extends ApplicationEvent {
    private User user;
    private String newPassword;

    public UserFindPasswordApplicationEvent(Object source, User user, String newPassword) {
        super(source);
        this.user = user;
        this.newPassword= newPassword;
    }
}

