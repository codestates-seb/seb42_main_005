package com.project.mainproject.user.controller;

import com.project.mainproject.user.dto.AdminUsersDto;
import com.project.mainproject.user.dto.BannedReviewsDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @PostMapping("/access/success")
    public ResponseEntity approvalPharmacy(AdminUsersDto adminUsersDto) {
        //TODO

        return ResponseEntity.ok().build();
    }

    @PostMapping("/access/failure")
    public ResponseEntity rejectPharmacy(AdminUsersDto adminUsersDto) {
        //TODO

        return ResponseEntity.ok().build();
    }

    @PostMapping("/block")
    public ResponseEntity blockUsers(@RequestParam int period, AdminUsersDto adminUsersDto) {
        //TODO

        return ResponseEntity.ok().build();
    }

    @PostMapping("/fired")
    public ResponseEntity banishUsers(AdminUsersDto adminUsersDto) {
        //TODO

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/banned")
    public ResponseEntity deleteReviews(BannedReviewsDto bannedReviewsDto) {
        //TODO

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/banned")
    public ResponseEntity restoreReviews(BannedReviewsDto bannedReviewsDto) {
        //TODO

        return ResponseEntity.ok().build();
    }
}
