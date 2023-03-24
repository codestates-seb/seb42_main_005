package com.project.mainproject.utils;

import com.project.mainproject.security.UserContext;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

public class CheckLoginUser {

    public static String checkUsername(Object principal) {
        if (principal instanceof String) {
             return principal.toString();
        } else {
            return ((UserContext) principal).getUsername();
        }
    }

    public static Long getContextIdx(Object principal) {
        if (principal instanceof String) {
            return -1L;
        } else {
            return Long.parseLong(((UserContext) principal).getUserId());
        }
    }

}
