package com.project.mainproject.store.repository;

import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import com.project.mainproject.store.dto.DBdto.DBStoreListDto;
import com.project.mainproject.store.dto.DBdto.QDBStoreListDto;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.project.mainproject.review.entity.QReview.review;
import static com.project.mainproject.store.entity.QStore.store;
import static com.project.mainproject.user.entity.QPickedStore.pickedStore;
import static com.querydsl.core.types.dsl.MathExpressions.*;

@Repository
@RequiredArgsConstructor
public class StoreQueryRepository {
    private JPAQueryFactory queryFactory;
    private final double RADIUS_EARTH_KM = 6371;

    public DBStoreDetailDto findData(Long storeIdx) {
        return queryFactory
                .select(Projections.constructor(DBStoreDetailDto.class,
                        store.storeIdx, store.name, store.address, store.longitude, store.latitude, store.tel, store.etc,
                        getReviewRating(),
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

    public List<DBStoreListDto> getStoreList(double lat, double lng, double distanceCondition,String sortCondition) {
        Expression<Double> latitude  = Expressions.constant(lat);
        Expression<Double> longitude = Expressions.constant(lng);
        Expression<Double> distanceCond = Expressions.constant(distanceCondition);
        return queryFactory
                .select(new QDBStoreListDto(
                        store.storeIdx,store.name,store.address,store.latitude,store.longitude,
                        getReviewRating(),
                        JPAExpressions          //distance
                                .select(
                                        acos(sin(radians(store.latitude))
                                                .multiply(sin(radians(latitude)))
                                                .add(cos(radians(store.latitude))
                                                        .multiply(cos(radians(latitude)))
                                                        .multiply(cos(radians(store.longitude.subtract(longitude))))).as("distance")
                                        )
                                ),
                        pickedStoreCount(),
                        reviewCount(),
                        store.storeImages.imagePath,store._super.modifiedAt
                ))
                .from(store)
                .leftJoin(store.reviews,review)
                .leftJoin(store.pickedStores, pickedStore)
                .where(getDistanceCondition(latitude, longitude, distanceCond))
                .orderBy(orderByCondition(sortCondition))
                .fetch();
    }
    //정렬 기준 미적용


    //내부 동작 쿼리
    private OrderSpecifier orderByCondition(String sortCondition) {
        switch (sortCondition) {
            case "pickedStoreCount":
            case "reviewCount":
                return Expressions.numberPath(Long.class, sortCondition).asc();
            default:
                return Expressions.numberPath(Double.class, sortCondition).asc();
        }
    }
    private Expression<Double> getReviewRating() {
        return JPAExpressions          //rating
                .select(review.rating.avg().as("rating"));
    }

    private Expression<Long> pickedStoreCount() {
        return JPAExpressions.select(pickedStore.count().as("pickedStoreCount"));
    }

    private Expression<Long> reviewCount() {
        return JPAExpressions.select(review.count().as("reviewCount"));
    }
    private Expression<Double> getDistance(Expression<Double> latitude, Expression<Double> longitude) {
        return JPAExpressions          //distance
                .select(
                        acos(sin(radians(store.latitude))
                                .multiply(sin(radians(latitude)))
                                .add(cos(radians(store.latitude))
                                        .multiply(cos(radians(latitude)))
                                        .multiply(cos(radians(store.longitude.subtract(longitude))))).as("distance")
                        )
                );
    }


    /*
    * where 조건 절
    * */
    private BooleanExpression getDistanceCondition(Expression<Double> latitude, Expression<Double> longitude, Expression<Double> distanceCond) {
        return acos(sin(radians(store.latitude))
                .multiply(sin(radians(latitude)))
                .add(cos(radians(store.latitude))
                        .multiply(cos(radians(latitude)))
                        .multiply(cos(radians(store.longitude.subtract(longitude)))))).loe(distanceCond);
    }



}
