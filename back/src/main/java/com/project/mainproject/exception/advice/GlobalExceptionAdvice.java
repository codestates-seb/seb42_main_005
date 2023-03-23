package com.project.mainproject.exception.advice;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.exception.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {

    /*
     * Dto Validation 예외 처리용
     * */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error("#### MethodArgumentNotValidException", e);

        return ErrorResponse.of(e.getBindingResult());
    }

    /*
     * Controller validation 예외 처리용
     * */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstraintViolationException(ConstraintViolationException e) {
        log.error("#### ConstraintViolationException", e);

        return ErrorResponse.of(e.getConstraintViolations());
    }

    @ExceptionHandler
    public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {
        log.error("#### BusinessLogicException", e);

        return ResponseEntity
                .status(e.getHttpCode())
                .body(SingleResponseDto.builder()
                        .httpCode(e.getHttpCode())
                        .message(e.getReason()));
    }
}
//    /*
//     *  HTTP 메서드 에러
//     * */
//    @ExceptionHandler
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public HttpRequestMethodNotSupportedException handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
//        log.error("#### HttpRequestMethodNotSupportedException", e);
//
//        return e;
//    }
//
//    /*
//     * 요청 핸들러가 클라이언트에서 허용할 수 있는 응답을 생성할 수 없을 때 발생하는 예외입니다.
//     * ex) Getter 미사용, JSON 파일만 받게 되어있는데 JSON 파일 이외의 파일을 받을 때 등등
//     * */
//    @ExceptionHandler
//    public ResponseEntity handleHttpMediaTypeNotAcceptableException(HttpMediaTypeNotAcceptableException e) {
//        log.error("### HttpMediaTypeNotAcceptableException", e);
//
//        return ResponseEntity
//                .status(HttpStatus.NOT_ACCEPTABLE)
//                .header("Accept","application/json")
//                .body(SingleResponseDto
//                        .builder()
//                        .httpCode(CommonExceptionCode.ACCEPT_TYPE_ERROR
//                                .getHttpStatus().value())
//                        .message(e.getMessage())
//                        .build());
//    }
//
//
//    /*
//    * Body 값이 없을 때 발생하는 예외
//    * */
//    @ExceptionHandler
//    public ResponseEntity handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
//        log.error("#### HttpMessageNotReadableException", e);
//
//        return ResponseEntity
//                .status(HttpStatus.NOT_ACCEPTABLE)
//                .body(SingleResponseDto
//                        .builder()
//                        .httpCode(CommonExceptionCode.NOT_HAVE_BODY
//                                .getHttpStatus().value())
//                        .message(CommonExceptionCode.NOT_HAVE_BODY
//                                .getMessage())
//                        .build());
//
//    }
//    // TODO: Accept 헤더 타입을 */* 로 만들면 문제가 발생한다 이를 해결하는 방법을 모르겠다. 각 요청마다 다르게 전달해야 할 수 있는데 이를 해결하는 방법을 잘 모르겠다.
//
//    /*
//    * 파라미터 오류
//    * */
//    @ExceptionHandler
//    public ResponseEntity handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
//        log.error("####MissingServletRequestParameterException",e);
//
//        return ResponseEntity
//                .status(HttpStatus.NOT_ACCEPTABLE)
//                .body(SingleResponseDto
//                        .builder()
//                        .httpCode(CommonExceptionCode.PARAMETER_ERROR
//                                .getHttpStatus().value())
//                        .message("파라미터 문제 발생!! " +
//                                "요청 parameter 타입 = " + e.getParameterType() +
//                                "  요청 parameter 변수명 = "+e.getParameterName())
//                        .build());
//    }
//    // TODO : 동시에 2개 이상의 파라미터 예외가 발생하더라도 1개의 파라미터 예외만 처리해준다. 이를 해결하는 방법이 궁금하다.
//
//
//
//    @ExceptionHandler
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    public ResponseEntity handleRuntimeLogicException(RuntimeException e) {
//        log.error("#### RuntimeException", e);
//
//        return ResponseEntity.accepted().body(SingleResponseDto.builder()
//                .httpCode(500)
//                .message("서버단 오류입니다."));
//    }
//}
//
///*
//* TODO: 예외 처리 방식이 각각 상이하다. 대표적으로 business 예외 처리와 기본적인 예외처리 방식이 다르다. -> 예외 응답 방식의 통일이 필요할 것 같지만 생각하는 느낌이 나지 않는다.
//* */