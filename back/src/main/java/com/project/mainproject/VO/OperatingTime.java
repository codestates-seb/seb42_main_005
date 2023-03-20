package com.project.mainproject.VO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Access;
import javax.persistence.Embeddable;
import java.time.LocalTime;

import static javax.persistence.AccessType.FIELD;

@Getter
@Embeddable
@Access(FIELD)
@Builder
@AllArgsConstructor
public class OperatingTime {
    private LocalTime startTime;
    private LocalTime endTime;

    protected OperatingTime() {
        super();
    }
    //편의 메서드
    public boolean checkOperating() {
        if (LocalTime.now().isBefore(endTime) && startTime != null) {
            return true;
        }
        return false;
    }
    public boolean isNightOperating() {

        if (endTime.getHour() > 22) {
            return true;
        }
        return false;
    }


}
