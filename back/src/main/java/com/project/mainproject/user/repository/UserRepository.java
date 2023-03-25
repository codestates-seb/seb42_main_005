package com.project.mainproject.user.repository;

import com.project.mainproject.user.entity.User;
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

}
