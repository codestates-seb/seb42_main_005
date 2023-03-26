package com.project.mainproject.dto;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserIdxRequestDto {
    @Setter
    private Long userIdx;
}
