package com.project.mainproject.store.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class FilterTagDto {
    private List<String> filterCondition;
}
