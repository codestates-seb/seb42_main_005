package com.project.mainproject.store.repository;

import com.project.mainproject.store.dto.DBdto.DBStoreDetailDto;
import com.project.mainproject.store.dto.DBdto.DBStoreListDto;
import com.project.mainproject.store.dto.DBdto.QDBStoreDetailDto;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static com.project.mainproject.review.entity.QReview.review;
import static com.project.mainproject.store.entity.QStore.store;
import static com.project.mainproject.store.entity.QStoreImage.storeImage;
import static com.project.mainproject.user.entity.QPickedStore.pickedStore;
import static com.querydsl.core.types.dsl.MathExpressions.*;

@Repository
public class StoreQueryRepository {
    private final JPAQueryFactory queryFactory;
    private final double RADIUS_EARTH_KM = 6371;

    public StoreQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public DBStoreDetailDto findData(Long storeIdx) {
        DBStoreDetailDto dbStoreDetailDto = queryFactory
                .select(new QDBStoreDetailDto(
                        store.storeIdx, store.name, store.address, store.longitude, store.latitude, store.tel, store.etc,
                        review.rating.avg(),
                        pickedStore.storeId.count(),
                        storeImage.imagePath,
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
                .leftJoin(store.reviews, review)
                .leftJoin(store.pickedStores, pickedStore)
                .leftJoin(store.storeImages, storeImage)
                .where(store.storeIdx.eq(storeIdx))
                .groupBy(store.storeIdx, storeImage.imagePath)
                .fetchOne();
        return dbStoreDetailDto;
    }

    public List<DBStoreListDto> getStoreList(double lat, double lng, double distanceCondition, String sortCondition, String filterCond, boolean isHoliday) {
//        Expression<Double> latitude  = Expressions.constant(lat);
//        Expression<Double> longitude = Expressions.constant(lng);
//        Expression<Double> distanceCond = Expressions.constant(distanceCondition);
//        return queryFactory
//                .select(new QDBStoreListDto(
//                        store.storeIdx,store.name,store.address,store.latitude,store.longitude,
//                        getReviewRating(),
//                        JPAExpressions          //distance
//                                .select(
//                                        acos(sin(radians(store.latitude))
//                                                .multiply(sin(radians(latitude)))
//                                                .add(cos(radians(store.latitude))
//                                                        .multiply(cos(radians(latitude)))
//                                                        .multiply(cos(radians(store.longitude.subtract(longitude))))).as("distance")
//                                        )
//                                ),
//                        pickedStoreCount(),
//                        reviewCount(),
//                        store.storeImages.imagePath,store._super.modifiedAt
//                ))
//                .from(store)
//                .leftJoin(store.reviews,review)
//                .leftJoin(store.pickedStores, pickedStore)
//                .where(getDistanceCondition(latitude, longitude, distanceCond),getOperatingCondition(isHoliday,filterCond))
//                .orderBy(orderByCondition(sortCondition))
//                .fetch();
        return null;
    }

    //내부 동작 쿼리 orderBy
    private OrderSpecifier orderByCondition(String sortCondition) {
        switch (sortCondition) {
            case "pickedStoreCount":
            case "reviewCount":
                return Expressions.numberPath(Long.class, sortCondition).asc();
            default:
                return Expressions.numberPath(Double.class, sortCondition).asc();
        }
    }

    //내부 동작 쿼리 select
    private Expression<Double> getReviewRating(Long storeIdx) {
        return JPAExpressions          //rating
                .select(review.rating.avg().as("rating"))
                .from(review);
    }

    private Expression<Long> pickedStoreCount(Long storeIdx) {
        return JPAExpressions.select(pickedStore.count().as("pickedStoreCount"))
                .from(pickedStore)
                .where(pickedStore.store.storeIdx.eq(storeIdx));
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


    //내부동작 쿼리 where 절
    private BooleanExpression getDistanceCondition(Expression<Double> latitude, Expression<Double> longitude, Expression<Double> distanceCond) {
        return acos(sin(radians(store.latitude))
                .multiply(sin(radians(latitude)))
                .add(cos(radians(store.latitude))
                        .multiply(cos(radians(latitude)))
                        .multiply(cos(radians(store.longitude.subtract(longitude)))))).loe(distanceCond);
    }

    private BooleanExpression getOperatingCondition(boolean isHoliday, String filterCond) {
        if (!filterCond.equals("holiday")) {
            return null;
        }

        if (!isHoliday) {
            return getNormalOperatingCondition();
        }

        return getHolidayOperatingCondition();
    }

    private BooleanExpression getNormalOperatingCondition() {
        DayOfWeek dayOfWeek = LocalDate.now().getDayOfWeek();
        LocalTime currentTime = LocalTime.now();
        switch (dayOfWeek) {
            case MONDAY:
                return store.mondayOperating.startTime.before(currentTime)
                        .and(store.mondayOperating.endTime.after(currentTime));
            case THURSDAY:
                return store.thursdayOperating.startTime.before(currentTime)
                        .and(store.thursdayOperating.endTime.after(currentTime));
            case WEDNESDAY:
                return store.wednesdayOperating.startTime.before(currentTime)
                        .and(store.wednesdayOperating.endTime.after(currentTime));
            case TUESDAY:
                return store.tuesdayOperating.startTime.before(currentTime)
                        .and(store.tuesdayOperating.endTime.after(currentTime));
            case FRIDAY:
                return store.fridayOperating.startTime.before(currentTime)
                        .and(store.fridayOperating.endTime.after(currentTime));
            case SATURDAY:
                return store.saturdayOperating.startTime.before(currentTime)
                        .and(store.saturdayOperating.endTime.after(currentTime));
            default:
                return store.sundayOperating.startTime.before(currentTime)
                        .and(store.sundayOperating.endTime.after(currentTime));
        }
    }

    private BooleanExpression getHolidayOperatingCondition() {
        LocalTime currentTime = LocalTime.now();

        return store.holidayOperating.startTime.before(currentTime)
                .and(store.holidayOperating.endTime.after(currentTime));
    }

}
