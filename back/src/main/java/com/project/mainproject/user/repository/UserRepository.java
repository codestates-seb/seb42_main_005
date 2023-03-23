package com.project.mainproject.user.repository;

import com.project.mainproject.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select u from User u where u.userIdx in :userIdxs")
    List<User> findByIds(@Param("userIdxs") List<Long> userIdxs);

    @Query("delete from User u WHERE u.userIdx in :userIdxs")
    void deleteUserByIdList(@Param("userIdx")List<Long> userIdxs);
    Optional<User> findByEmail(String email);

}
