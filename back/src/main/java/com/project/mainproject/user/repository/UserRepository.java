package com.project.mainproject.user.repository;

import com.project.mainproject.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Store, Long> {
}
