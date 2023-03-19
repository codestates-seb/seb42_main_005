package com.project.mainproject.store.repository;

import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.project.mainproject.review.entity.QReview.review;
import static com.project.mainproject.store.entity.QStore.store;

@Repository
@RequiredArgsConstructor
public class StoreQueryRepository {
    private JPAQueryFactory queryFactory;


    public DBStoreDetailDto findData(Long storeIdx) {
        return queryFactory
                .select(Projections.constructor(DBStoreDetailDto.class,
                        store.storeIdx, store.name, store.address, store.longitude, store.latitude, store.tel, store.etc,
                        JPAExpressions
                                .select(review.rating.avg()),
                        store.pickedStores.size(),
                        store.storeImages,
                        store.mondayOperating,
                        store.tuesdayOperating,
                        store.wednesdayOperating,
                        store.thursdayOperating,
                        store.fridayOperating,
                        store.saturdayOperating,
                        store.sundayOperating,
                        store.holidayOperating,
                        store._super.createdAt,
                        store._super.modifiedAt
                ))
                .from(store)
                .leftJoin(store.reviews,review)
                .where(store.storeIdx.eq(storeIdx))
                .fetchOne();
    }

}
