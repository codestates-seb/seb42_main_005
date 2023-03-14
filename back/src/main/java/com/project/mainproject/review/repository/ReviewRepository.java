package com.project.mainproject.review.repository;

import com.project.mainproject.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Store, Long> {
}
