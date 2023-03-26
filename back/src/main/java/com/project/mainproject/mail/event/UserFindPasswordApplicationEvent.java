package com.project.mainproject.mail.event;

import com.project.mainproject.user.entity.User;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class UserFindPasswordApplicationEvent extends ApplicationEvent {
    private User user;

    public UserFindPasswordApplicationEvent(Object source, User user) {
        super(source);
        this.user = user;
    }
}

