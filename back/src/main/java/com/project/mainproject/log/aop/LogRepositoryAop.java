package com.project.mainproject.log.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

import java.lang.reflect.Method;

@Aspect
@Component
@Slf4j
public class LogRepositoryAop {
    @Around("execution(* com.project.mainproject.*.repository.*Repository.*(..))")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start(String.valueOf(joinPoint.getSignature()));
        Object proceed = joinPoint.proceed();
        stopWatch.stop();
        Method method = getMethod(joinPoint);
        log.info("[Repository Time Check] {} -> {}",method.getName() ,stopWatch.getTotalTimeSeconds() + "s");
        if (stopWatch.getTotalTimeSeconds() >5) {
            log.error("에러!! 응답이 5초 이상. 메서드 명 : {}, 실행 시간 : {}", method.getName(),stopWatch.getTotalTimeSeconds() + "s");
        } else if (stopWatch.getTotalTimeSeconds() >3) {
            log.warn("위험!! 응답이 3초 이상 걸려유. 메서드 명 : {}, 실행 시간 : {}", method.getName(),stopWatch.getTotalTimeSeconds() + "s");
        }
        return proceed;
    }

    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }
}
