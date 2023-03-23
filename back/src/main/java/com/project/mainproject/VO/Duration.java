package com.project.mainproject.VO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Embeddable;
import java.time.LocalDateTime;

import static javax.persistence.AccessType.*;

@Embeddable
@Getter
@Access(FIELD)
@Builder
@AllArgsConstructor
public class Duration {
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public Duration() {
    }

//연관된 메서드//


}
