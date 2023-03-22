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
    public ResponseEntity approvalPharmacy(@RequestBody AdminUsersStoreDto adminUsersStoreDto) {
        List<Long> userIdxs = adminUsersStoreDto.getUsers().stream().map(user -> user.getUserIdx()).collect(Collectors.toList());
        List<Long> storeIdxs = adminUsersStoreDto.getStores().stream().map(store -> store.getStoreIdx()).collect(Collectors.toList());

        SingleResponseDto responseDto = adminService.approvalPharmacy(userIdxs, storeIdxs);


        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PostMapping("/access/failure")
    public ResponseEntity rejectPharmacy(@RequestBody AdminUsersDto adminUsersDto) {
        List<Long> userIdx = adminUsersDto.getUsers().stream().map(user -> user.getUserIdx()).collect(Collectors.toList());

        SingleResponseDto responseDto = adminService.rejectPharmacy(userIdx);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PostMapping("/block")
    public ResponseEntity blockUsers(@RequestParam("period") int period, @RequestBody AdminUsersStoreDto adminUsersStoreDto) {
        //TODO

        SingleResponseDto tmpResponse = CommonStub.getSingleResponseStub();

        return ResponseEntity.status(HttpStatus.OK).body(tmpResponse);
    }

    @PostMapping("/fired")
    public ResponseEntity banishUsers(@RequestBody AdminUsersStoreDto adminUsersStoreDto) {
        //TODO

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
