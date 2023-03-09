package com.project.mainproject.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum ResultStatus {

    PROCESS_COMPLETED(OK, "정상처리 되었습니다."),
    CREATE_COMPLETED(CREATED, "정상처리 되었습니다."),
    DELETE_COMPLETED(NO_CONTENT, "정상처리 되었습니다."),

    MEMBER_NOT_FOUND(NOT_FOUND, "Member Not Found"),
    MEMBER_EXIST(CONFLICT, "Member is already Exist!"),
    MEMBER_JWT_EXIST(CONFLICT, "JWT Registry Member is Exist")
    // TODO : 추가
    ;

    private final HttpStatus httpStatus;
    private final String message;

    public int getHttpCode() {
        return this.httpStatus.value();
    }
}
