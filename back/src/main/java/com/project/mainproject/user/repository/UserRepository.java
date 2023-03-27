package com.project.mainproject.user.repository;

import com.project.mainproject.user.dto.UserInfoDto;
import com.project.mainproject.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select u from User u where u.userIdx in :userIdxs")
    List<User> findByIds(@Param("userIdxs") List<Long> userIdxs);

    @Modifying // 추가했습니다 03/25 예솔
    @Query("delete from User u WHERE u.userIdx in :userIdxs")
    void deleteUserByIdList(@Param("userIdxs")List<Long> userIdxs);
    Optional<User> findByEmail(String email);


    @Query("SELECT new com.project.mainproject.user.dto.db.DBUserInfo(u.userIdx,u.createdAt,u.name,u.email,u.address,u.imagePath,u.userType,u.userStatus, " +
            "count (r), " +
            "sum (r.reportCnt)," +
            "ub.duration.endDate" +
            ") from User u " +
            "left join u.reviews r " +
            "left join u.userBanned ub " +
            "group by u.userIdx,ub.duration.endDate"
            )
    Page<UserInfoDto> findUserInfoWithBannedStoreDate(Pageable pageable);
}