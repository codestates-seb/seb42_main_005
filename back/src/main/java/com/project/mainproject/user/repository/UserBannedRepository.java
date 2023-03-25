package com.project.mainproject.user.repository;

import com.project.mainproject.user.entity.UserBanned;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserBannedRepository extends JpaRepository<UserBanned, Long> {

    @Query("DELETE  From UserBanned ub where ub.user.userIdx in :userIdxs")
    void usersDelete(@Param("userIdxs")List<Long> usersIdx);
}
