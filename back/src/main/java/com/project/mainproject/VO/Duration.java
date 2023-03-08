package com.project.mainproject.VO;

import lombok.Getter;

import javax.persistence.Embeddable;
import java.time.LocalDateTime;

@Embeddable
@Getter
public class Duration {
    private LocalDateTime startDate;
    private LocalDateTime endDate;


    //연관된 메서드//


}
