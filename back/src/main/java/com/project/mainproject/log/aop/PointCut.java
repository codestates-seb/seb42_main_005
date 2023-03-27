package com.project.mainproject.log.aop;

import org.aspectj.lang.annotation.Pointcut;

public class PointCut {
    @Pointcut("execution(* com.project.mainproject.*.controller..*.*(..))")
    public void controllerPointCut(){}

    @Pointcut("execution(public * com.project.mainproject.*.service..*.*(..))")
    public void servicePointCut() {

    }
}
