package com.project.mainproject.redis.repository;

import com.project.mainproject.openApi.entity.HolidayData;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RedisRepository extends CrudRepository<HolidayData,String> {
    Optional<HolidayData> findById(String id);

    @Override
    Iterable<HolidayData> findAll();
}
