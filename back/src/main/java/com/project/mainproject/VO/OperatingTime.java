package com.project.mainproject.VO;

import lombok.Getter;

import javax.persistence.Access;
import javax.persistence.Embeddable;
import java.time.LocalTime;

import static javax.persistence.AccessType.FIELD;

@Getter
@Embeddable
@Access(FIELD)
public class OperatingTime {
    private LocalTime startTime;
    private LocalTime endTime;


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
