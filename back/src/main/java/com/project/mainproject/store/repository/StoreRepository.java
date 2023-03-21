package com.project.mainproject.store.repository;

import com.project.mainproject.store.dto.DBdto.DBStoreSliceDto;
import com.project.mainproject.store.entity.Store;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {

    @Query(value = "SELECT s.storeIdx,s.name, s.address," +
            "(SELECT COALESCE(ROUND(AVG(r.rating), 2), 0) FROM Review r WHERE r.store.storeIdx = :id) as rating, " +
            "(6371 * acos(cos(radians(:lat)) * cos(radians(s.latitude)) * cos(radians(s.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(s.latitude)))) as distance, " +
            "(SELECT count(ps) FROM PickedStore ps where ps.store.storeIdx = :id) as PickedCount ," +
            "(SELECT count(r) FROM Review r where r.store.storeIdx =:id) as ReviewCount, " + //review Count
            "s.storeImages ,s.modifiedAt " +
            "FROM Store s WHERE distance <= :distance ")
    Slice<DBStoreSliceDto> getStoreSlice(@Param("lat") double lat, @Param("lng") double lng, @Param("distance") double distance, Pageable pageable);
    //일단 데이터를 통으로 다 땡겨와서 distance를 만든 다음 처리한다 -> 효율성에 문제가 생긴다.
    //정렬 기준과 페이징 기준을 잡기가 어렵다.

    @Query(value = "SELECT new com.project.mainproject.store.dto.DBdto.DBStoreSliceDto( s.storeIdx, s.name, s.address, " +
            "(SELECT COALESCE(ROUND(AVG(r.rating), 2), 0) FROM Review r WHERE r.store.storeIdx = :id) AS rating , " +
            "(6371 * ACOS(COS(RADIANS(:lat)) * COS(RADIANS(s.latitude)) * COS(RADIANS(s.longitude) - RADIANS(:lng)) + SIN(RADIANS(:lat)) * SIN(RADIANS(s.latitude)))) AS distance, " +
            "(SELECT COUNT(ps) FROM PickedStore ps WHERE ps.store.storeIdx = :id) AS PickedCount, " +
            "(SELECT COUNT(r) FROM Review r WHERE r.store.storeIdx = :id) AS ReviewCount, " + //review Count
            "s.storeImages, s.modifiedAt ) " +
            "FROM Store s " +
            "WHERE (:distance IS NULL OR distance <= :distance) " +
            "AND ( " +
            "    (FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 2 AND s.mondayOperating.endTime >= TIME('22:00:00')) " +
            "    OR (FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 3 AND s.tuesdayOperating.endTime >= TIME('22:00:00')) " +
            "    OR (FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 4 AND s.wednesdayOperating.endTime >= TIME('22:00:00')) " +
            "    OR (FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 5 AND s.thursdayOperating.endTime >= TIME('22:00:00')) " +
            "    OR (FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 6 AND s.fridayOperating.endTime >= TIME('22:00:00')) " +
            "    OR (FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 7 AND s.saturdayOperating.endTime >= TIME('22:00:00')) " +
            "    OR (FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 1 AND s.sundayOperating.endTime >= TIME('22:00:00')) " +
            ")")
    Slice<DBStoreSliceDto> getStoreWithNightOperatingSlice(@Param("lat") double lat, @Param("lng") double lng, @Param("distance") double distance, Pageable pageable);
    //공휴일일 때의 문제 발생한다.
    //공휴일 인지 여부가 검증이 되지 않는다.

    @Query(value = "SELECT s.storeIdx,s.name, s.address," +
            "(SELECT COALESCE(ROUND(AVG(r.rating), 2), 0) FROM Review r WHERE r.store.storeIdx = :id) as rating, " +
            "(6371 * acos(cos(radians(:lat)) * cos(radians(s.latitude)) * cos(radians(s.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(s.latitude)))) as distance, " +
            "(SELECT count(ps) FROM PickedStore ps where ps.store.storeIdx = :id) as PickedCount ," +
            "(SELECT count(r) FROM Review r where r.store.storeIdx =:id) as ReviewCount, " + //review Count
            "s.storeImages ,s.modifiedAt " +
            "FROM Store s WHERE distance <= :distance AND " +
            "    (CASE " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 2 THEN s.mondayOperating.endTime " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 3 THEN s.tuesdayOperating.endTime " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 4 THEN s.wednesdayOperating.endTime " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 5 THEN s.thursdayOperating.endTime " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 6 THEN s.fridayOperating.endTime " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 7 THEN s.saturdayOperating.endTime " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 1 THEN s.sundayOperating.endTime " +
            "    END) <= FUNCTION('TIME', CURRENT_TIMESTAMP) AND " +
            "    (CASE " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 2 THEN s.mondayOperating.endTime " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 3 THEN s.tuesdayOperating.endTime " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 4 THEN s.wednesdayOperating.endTime " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 5 THEN s.thursdayOperating.endTime " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 6 THEN s.fridayOperating.endTime " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 7 THEN s.saturdayOperating.endTime " +
            "        WHEN FUNCTION('DAYOFWEEK', CURRENT_TIMESTAMP) = 1 THEN s.sundayOperating.endTime " +
            "    END) >= FUNCTION('TIME', CURRENT_TIMESTAMP) ")
    Slice<DBStoreSliceDto> getStoreWithFilterOperatingSlice(@Param("lat") double lat, @Param("lng") double lng, @Param("distance") double distance, Pageable pageable);
    //일단 데이터를 통으로 다 땡겨와서 distance를 만든 다음 처리한다 -> 효율성에 문제가 생긴다.

    @Query(value = "SELECT s.storeIdx,s.name, s.address," +
            "(SELECT COALESCE(ROUND(AVG(r.rating), 2), 0) FROM Review r WHERE r.store.storeIdx = :id) as rating, " +
            "(6371 * acos(cos(radians(:lat)) * cos(radians(s.latitude)) * cos(radians(s.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(s.latitude)))) as distance, " +
            "(SELECT count(ps) FROM PickedStore ps where ps.store.storeIdx = :id) as PickedCount ," +
            "(SELECT count(r) FROM Review r where r.store.storeIdx =:id) as ReviewCount, " + //review Count
            "s.storeImages ,s.modifiedAt " +
            "FROM Store s WHERE distance <= :distance ")
    List<DBStoreSliceDto> getStoreAllList(@Param("lat") double lat, @Param("lng") double lng, @Param("distance") double distance, Sort sort);

    @Query(value = "SELECT s.storeIdx,s.name, s.address," +
            "(SELECT COALESCE(ROUND(AVG(r.rating), 2), 0) FROM Review r WHERE r.store.storeIdx = :id) as rating, " +
            "(6371 * acos(cos(radians(:lat)) * cos(radians(s.latitude)) * cos(radians(s.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(s.latitude)))) as distance, " +
            "(SELECT count(ps) FROM PickedStore ps where ps.store.storeIdx = :id) as PickedCount ," +
            "(SELECT count(r) FROM Review r where r.store.storeIdx =:id) as ReviewCount, " + //review Count
            "s.storeImages ,s.modifiedAt " +
            "FROM Store s WHERE distance <= :distance ")
    List<DBStoreSliceDto> getStoreAllListFilter(@Param("lat") double lat, @Param("lng") double lng, @Param("distance") double distance, Sort sort);
    //데이터를 한방에 전송해주면 이 데이터를 가지고 프론트에서 페이징 처리를 해야될 때 사용한다.
    //페이징 이용하지 않고 프론트에 한방에 데이터를 보낼 때 사용 -> 문제점은 한방에 너무 많은 데이터를 전송해야되는 문제가 있다.
}