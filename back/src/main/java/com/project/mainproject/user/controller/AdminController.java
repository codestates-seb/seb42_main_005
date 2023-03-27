package com.project.mainproject.user.controller;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.user.dto.AdminUsersDto;
import com.project.mainproject.user.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.project.mainproject.enums.ResultStatus.PROCESS_COMPLETED;
import static com.project.mainproject.enums.ResultStatus.REJECT_PHARMACY;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @PostMapping("/access/success")
    public ResponseEntity approvalPharmacy(@RequestBody AdminUsersDto adminUsersDto) {
        List<Long> userIdxs = adminUsersDto.getUserIdxs().stream().map(user -> user.getUserIdx()).collect(Collectors.toList());
        adminService.approvalPharmacy(userIdxs);

        SingleResponseDto responseDto = SingleResponseDto.builder()
                .message(PROCESS_COMPLETED.getMessage())
                .httpCode(PROCESS_COMPLETED.getHttpCode())
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PostMapping("/access/failure")
    public ResponseEntity rejectPharmacy(@RequestBody AdminUsersDto adminUsersDto) {
        List<Long> userIdx = adminUsersDto.getUserIdxs().stream().map(user -> user.getUserIdx()).collect(Collectors.toList());
        adminService.rejectPharmacy(userIdx);

        SingleResponseDto responseDto = SingleResponseDto.builder()
                .message(REJECT_PHARMACY.getMessage())
                .httpCode(REJECT_PHARMACY.getHttpCode())
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }


    @PostMapping("/block")
    public ResponseEntity blockUsers(@RequestParam("period") int period, @RequestBody AdminUsersDto adminUsersDto) {
        List<Long> userIdx = adminUsersDto.getUserIdxs().stream().map(user -> user.getUserIdx()).collect(Collectors.toList());
        adminService.blockUsers(period, userIdx);

        SingleResponseDto responseDto = SingleResponseDto.builder()
                .httpCode(PROCESS_COMPLETED.getHttpCode())
                .message(PROCESS_COMPLETED.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PostMapping("/fired")
    public ResponseEntity banishUsers(@RequestBody AdminUsersDto adminUsersDto) {
        List<Long> userIdx = adminUsersDto.getUserIdxs().stream().map(user -> user.getUserIdx()).collect(Collectors.toList());
        adminService.banishUsers(userIdx);

        SingleResponseDto responseDto = SingleResponseDto.builder()
                .httpCode(PROCESS_COMPLETED.getHttpCode())
                .message(PROCESS_COMPLETED.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PostMapping("/restore")
    public ResponseEntity restoreUser(@RequestBody AdminUsersDto adminUsersDto) {
        List<Long> userIdx = adminUsersDto.getUserIdxs().stream().map(user -> user.getUserIdx()).collect(Collectors.toList());
        adminService.restoreUsers(userIdx);

        SingleResponseDto responseDto = SingleResponseDto.builder()
                .httpCode(PROCESS_COMPLETED.getHttpCode())
                .message(PROCESS_COMPLETED.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
