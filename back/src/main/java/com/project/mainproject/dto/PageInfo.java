package com.project.mainproject.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PageInfo {
    private int size;
    private int page;
    private int totalElement;
    private int totalPage;
    private Boolean isFirst;
    private Boolean isFinish;

    @Builder
    public PageInfo(int size, int page, int totalElement, int totalPage, boolean isFirst, boolean isFinish) {
        this.size = size;
        this.page = page;
        this.totalElement = totalElement;
        this.totalPage = totalPage;
        this.isFirst = isFirst;
        this.isFinish = isFinish;
    }
}
