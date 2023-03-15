package com.project.mainproject.VO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Embeddable;
import java.time.LocalTime;

@Getter
@Embeddable
@Builder
@AllArgsConstructor
public class OperatingTime {
    private LocalTime startTime;
    private LocalTime endTime;

    protected OperatingTime() {
        super();
    }
    //편의 메서드

    //TODO : 영업 시간 인지 체크

    //TODO : 심야 영업 여부


}
