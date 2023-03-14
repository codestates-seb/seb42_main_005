package com.project.mainproject.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class ErrorResponse {
    private final List<FieldError> fieldErrors;
    private final List<ConstraintViolationError> constraintViolations;
    private final HttpStatus httpStatus;

    private ErrorResponse(List<FieldError> fieldErrors, List<ConstraintViolationError> constraintViolations, HttpStatus httpStatus) {
        this.fieldErrors = fieldErrors;
        this.constraintViolations = constraintViolations;
        this.httpStatus = httpStatus;
    }

    public static ErrorResponse of(BindingResult bindingResult) {

        return new ErrorResponse(FieldError.of(bindingResult), null, null);
    }


    public static ErrorResponse of(Set<ConstraintViolation<?>> constraintViolations) {

        return new ErrorResponse(null, ConstraintViolationError.of(constraintViolations),null);
    }

    public static ErrorResponse of(HttpStatus httpStatus) {

        return new ErrorResponse(null,null,httpStatus);
    }



    /*
     * 경로 에러 발생 시 사용할 필드
     * */
    @Getter
    @AllArgsConstructor
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        public static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations) {

            return constraintViolations.stream().map(
                    constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue(),
                            constraintViolation.getMessage()
                    )).collect(Collectors.toList());
        }
    }



    /*
    * 파라미터 에러 발생 처리 필드
    * */
    @Getter
    @AllArgsConstructor
    public static class FieldError{
        private String field;
        private Object rejectedValue;
        private String reason;

        public static List<FieldError> of(BindingResult bindingResult) {
            final List<org.springframework.validation.FieldError> fieldErrorList = bindingResult.getFieldErrors();

            return fieldErrorList.stream().map(
                    fieldError -> new FieldError(
                            fieldError.getField(),
                            fieldError.getRejectedValue() == null ? "" : fieldError.getRejectedValue(),
                            fieldError.getDefaultMessage()
                    )).collect(Collectors.toList());
        }
    }
}
