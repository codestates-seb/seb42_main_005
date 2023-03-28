package com.project.mainproject.user.repository;

import com.project.mainproject.user.entity.UserBanned;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface UserBannedRepository extends JpaRepository<UserBanned, Long> {

    @Modifying
    @Query("DELETE  From UserBanned ub where ub.user.userIdx in :userIdxs")
    void usersDelete(@Param("userIdxs")List<Long> usersIdx);

    @Query(value = "" +
            " SELECT ub.user.userIdx " +
            "   FROM UserBanned ub "+
            "  WHERE ub.duration.endDate <= :recoverDate "
    )
    List<Long> findByBanEndDateLessThanEqual(@Param("recoverDate") LocalDateTime recoverDate);

    @Modifying
    @Query("DELETE FROM UserBanned ub WHERE ub.user.userIdx IN :usersIdx")
    void deleteAllByUsersIdx(@Param("usersIdx") List<Long> usersIdx);
}
