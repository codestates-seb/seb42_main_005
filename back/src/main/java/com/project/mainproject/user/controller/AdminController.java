package com.project.mainproject.user.controller;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dummy.CommonStub;
import com.project.mainproject.user.dto.AdminUsersDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @PostMapping("/access/success")
    public ResponseEntity approvalPharmacy(@RequestBody AdminUsersDto adminUsersDto) {
        //TODO

        SingleResponseDto tmpResponse = CommonStub.getSingleResponseStub();

        return ResponseEntity.status(HttpStatus.OK).body(tmpResponse);
    }

    @PostMapping("/access/failure")
    public ResponseEntity rejectPharmacy(@RequestBody AdminUsersDto adminUsersDto) {
        //TODO

        SingleResponseDto tmpResponse = CommonStub.getSingleResponseStub();

        return ResponseEntity.status(HttpStatus.OK).body(tmpResponse);
    }

    @PostMapping("/block")
    public ResponseEntity blockUsers(@RequestParam("period") int period, @RequestBody AdminUsersDto adminUsersDto) {
        //TODO

        SingleResponseDto tmpResponse = CommonStub.getSingleResponseStub();

        return ResponseEntity.status(HttpStatus.OK).body(tmpResponse);
    }

    @PostMapping("/fired")
    public ResponseEntity banishUsers(@RequestBody AdminUsersDto adminUsersDto) {
        //TODO

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
