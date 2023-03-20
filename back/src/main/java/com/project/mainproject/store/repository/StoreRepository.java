package com.project.mainproject.store.repository;

import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import com.project.mainproject.store.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StoreRepository extends JpaRepository<Store, Long> {
    @Query("SELECT new com.project.mainproject.store.dto.DBdto.DBStoreDetailDto(" +
            "s.storeIdx, s.name, s.address, s.longitude, s.latitude, s.tel, s.etc, " +
            "(SELECT COALESCE(ROUND(AVG(r.rating), 2), 0) FROM Review r WHERE r.store.storeIdx = :id), " +  //평균 별점
            "(SELECT count(ps) FROM PickedStore ps where ps.store.storeIdx = :id), " +                         //찜한 약국 카운
            "s.storeImages, s.mondayOperating, s.tuesdayOperating, s.wednesdayOperating, s.thursdayOperating, " +
            "s.fridayOperating, s.saturdayOperating, s.sundayOperating, s.holidayOperating, s.createdAt, s.modifiedAt) " +
            "FROM Store s WHERE s.storeIdx = :id")
    DBStoreDetailDto findData(@Param("id") Long storeIdx);
    //TODO : 서브쿼리가 많다. -> join을 통해 해결해보는 것은???
    //TODO : 인덱스를 만들어서 처리하는 방법은 어떤가?

    @Query(value = "Select s, " +
            "(6371 * acos(cos(radians(:lat)) * cos(radians(s.latitude)) * cos(radians(s.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(s.latitude)))) as distance " +
            "FROM Store s WHERE distance <= :distance")
    Page<Store> getStorepage(@Param("lat") double lat, @Param("lng") double lng, @Param("distance") double distance, Pageable pageable);
    //일단 데이터를 통으로 다 땡겨와서 distance를 만든 다음 처리한다 -> 효율성에 문제가 생긴다.
    //TODO : 인덱스에 대한 학습을 먼저 해본 뒤 변경 작업을 다시 수행해본다.
}