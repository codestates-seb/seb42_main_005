package com.project.mainproject.openApi.controller;

import com.project.mainproject.openApi.service.OpenApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OpenApiController {
    private final OpenApiService openApiService;

    @GetMapping("/api/get-holiday-Date")
    public String dataInt() {
        return openApiService.holiday("2023", "01");
    }

}
