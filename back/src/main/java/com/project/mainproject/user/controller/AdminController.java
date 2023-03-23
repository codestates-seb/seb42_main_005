package com.project.mainproject.user.controller;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dummy.CommonStub;
import com.project.mainproject.user.dto.AdminUsersDto;
import com.project.mainproject.user.dto.AdminUsersStoreDto;
import com.project.mainproject.user.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    @PostMapping("/access/success")
    public ResponseEntity approvalPharmacy(@RequestBody AdminUsersDto adminUsersDto) {
        List<Long> userIdxs = adminUsersDto.getUserIdxs().stream().map(user -> user.getUserIdx()).collect(Collectors.toList());

        SingleResponseDto responseDto = adminService.approvalPharmacy(userIdxs);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PostMapping("/access/failure")
    public ResponseEntity rejectPharmacy(@RequestBody AdminUsersDto adminUsersDto) {
        List<Long> userIdx = adminUsersDto.getUserIdxs().stream().map(user -> user.getUserIdx()).collect(Collectors.toList());

        SingleResponseDto responseDto = adminService.rejectPharmacy(userIdx);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PostMapping("/block")
    public ResponseEntity blockUsers(@RequestParam("period") int period, @RequestBody AdminUsersDto adminUsersDto) {
        List<Long> userIdx = adminUsersDto.getUserIdxs().stream().map(user -> user.getUserIdx()).collect(Collectors.toList());

        SingleResponseDto responseDto = adminService.blockUsers(period, userIdx);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PostMapping("/fired")
    public void banishUsers(@RequestBody AdminUsersDto adminUsersDto) {
        List<Long> userIdx = adminUsersDto.getUserIdxs().stream().map(user -> user.getUserIdx()).collect(Collectors.toList());

        adminService.banishUsers(userIdx);
    }
}
