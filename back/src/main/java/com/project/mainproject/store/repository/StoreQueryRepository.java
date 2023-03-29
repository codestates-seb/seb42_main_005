package com.project.mainproject.store.repository;

import com.project.mainproject.store.dto.DBdto.*;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.user.entity.PickedStore;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
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
import static com.project.mainproject.user.entity.QNormal.normal;
import static com.project.mainproject.user.entity.QPickedStore.pickedStore;
import static com.querydsl.core.types.dsl.MathExpressions.*;

@Repository
public class StoreQueryRepository {
    private final JPAQueryFactory queryFactory;
    private final double RADIUS_EARTH_KM = 6371;

    public StoreQueryRepository(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    public DBStoreDetailDto findData(Long storeIdx,Long userIdx) {
        List<DBStoreDetailDto> dbStoreDetailDto = queryFactory
                .select(new QDBStoreDetailDto(
                        store.storeIdx, store.name, store.address, store.longitude, store.latitude, store.tel, store.etc,
                        review.rating.avg(),
                        pickedStore.storeId.count(),
                        review.reviewIdx.count(),
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
                        store._super.modifiedAt,
                        new CaseBuilder()
                                .when(normal.userIdx.eq(userIdx)).then(true)
                                .otherwise(false)
                ))
                .from(store)
                .leftJoin(store.reviews, review)
                .leftJoin(store.pickedStores, pickedStore)
                .leftJoin(store.storeImages, storeImage)
                .leftJoin(pickedStore.normal,normal)
                .where(store.storeIdx.eq(storeIdx))
                .groupBy(store.storeIdx, storeImage.imagePath,normal.userIdx)
                .fetch();
        if (dbStoreDetailDto == null) {
            return null;
        }
        return dbStoreDetailDto.get(0);
    }

    public Store findData(Long storeIdx){
        return queryFactory
                .selectFrom(store)
                .leftJoin(store.pickedStores,pickedStore)
                .leftJoin(store.storeImages,storeImage)
                .leftJoin(store.reviews,review)
                .fetchJoin()
                .where(store.storeIdx.eq(storeIdx))
                .fetchOne();
    }


    /*
     * swLat : 9시 위도 가로
     * swLng : 6시 경도 세경 세로
     * neLat : 3시
     * neLng : 12시
     * */
    public List<DBStoreListDto> getStoreList(double maxLat, double minLat, double maxLng, double minLng, double lat, double lng, String sortCondition, String operatingFilterCond, boolean isHoliday,long userIdx) {
        Expression<Double> maxLatitude = Expressions.constant(maxLat);   //9
        Expression<Double> maxLongitude = Expressions.constant(maxLng);   //6
        Expression<Double> minLatitude = Expressions.constant(minLat);    //3
        Expression<Double> minLongitude = Expressions.constant(minLng);   //12
        Expression<Double> latitude = Expressions.constant(lat);
        Expression<Double> longitude = Expressions.constant(lng);


        return queryFactory
                .select(new QDBStoreListDto(
                        store.storeIdx, store.name, store.address, store.latitude, store.longitude,
                        round(review.rating.avg(),2).as("rating"),
                        ExpressionUtils.as((
                                acos(sin(radians(store.latitude))
                                        .multiply(sin(radians(latitude)))
                                        .add(cos(radians(store.latitude))
                                                .multiply(cos(radians(latitude)))
                                                .multiply(cos(radians(store.longitude.subtract(longitude)))))
                                ).multiply(RADIUS_EARTH_KM)
                        ), "distance"),
                        pickedStore.storeId.count().as("pickedStoreCount"),
                        review.reviewIdx.count().as("reviewCount"),
                        store.storeImages.imagePath,
                        store._super.modifiedAt,
                        new CaseBuilder()
                                .when(normal.userIdx.eq(userIdx)).then(true)
                                .otherwise(false)
                                .as("picked")
                )).distinct()
                .from(store)
                .leftJoin(store.reviews, review)
                .leftJoin(store.pickedStores, pickedStore)
                .leftJoin(store.storeImages, storeImage)
                .leftJoin(pickedStore.normal,normal)
                .where(store.longitude.goe(minLongitude), store.longitude.loe(maxLongitude), store.latitude.goe(minLatitude),store.latitude.loe(maxLatitude), getOperatingCondition(isHoliday, operatingFilterCond,userIdx))
                .orderBy(orderByCondition(sortCondition))
                .groupBy(store.storeIdx, storeImage.imagePath,normal.userIdx)
                .fetch();
    }


    public List<DBStoreListDto> getStoreList(double lat, double lng, double distanceCondition, String sortCondition, String operatingFilterCond, boolean isHoliday, long userIdx) {
        Expression<Double> latitude = Expressions.constant(lat);
        Expression<Double> longitude = Expressions.constant(lng);
        Expression<Double> distanceCond = Expressions.constant(distanceCondition);

        return queryFactory
                .select(new QDBStoreListDto(
                        store.storeIdx, store.name, store.address, store.latitude, store.longitude,
                        review.rating.avg().as("rating"),
                        ExpressionUtils.as((
                                acos(sin(radians(store.latitude))
                                        .multiply(sin(radians(latitude)))
                                        .add(cos(radians(store.latitude))
                                                .multiply(cos(radians(latitude)))
                                                .multiply(cos(radians(store.longitude.subtract(longitude)))))
                                ).multiply(RADIUS_EARTH_KM)
                        ), "distance"),
                        pickedStore.storeId.count().as("pickedStoreCount"),
                        review.reviewIdx.count().as("reviewCount"),
                        store.storeImages.imagePath,
                        store._super.modifiedAt,
                        new CaseBuilder()
                                .when(normal.userIdx.eq(userIdx)).then(true)
                                .otherwise(false)
                                .as("picked")
                )).distinct()
                .from(store)
                .leftJoin(store.reviews, review)
                .leftJoin(store.pickedStores, pickedStore)
                .leftJoin(store.storeImages, storeImage)
                .leftJoin(pickedStore.normal,normal)
                .where(getDistanceCondition(latitude, longitude, distanceCond), getOperatingCondition(isHoliday, operatingFilterCond,userIdx))
                .orderBy(orderByCondition(sortCondition))
                .groupBy(store.storeIdx, storeImage.imagePath,normal.userIdx)
                .fetch();
    }

    public List<DBPickedStoredListDto> getPickedStoreList(Long userIdx) {
        return queryFactory
                .select(new QDBPickedStoredListDto(
                        store.storeIdx, store.name, store.address, store.tel))
                .from(pickedStore)
                .join(pickedStore.store, store)
                .where(pickedStore.normal.userIdx.eq(userIdx))
                .fetch();
    }

    public List<PickedStore> findPickedStoreById(Long storeIdx) {
        return queryFactory
                .selectFrom(pickedStore)
                .where(pickedStore.store.storeIdx.eq(storeIdx))
                .fetch();
    }

    public Store findStoreById(Long storeIdx) {
        return queryFactory
                .selectFrom(store)
                .where(store.storeIdx.eq(storeIdx))
                .fetchOne();
    }

    public List<DBStoreSearchDto> searchStoreByName(String keyword, Long userIdx) {
        return queryFactory
                .select(new QDBStoreSearchDto(
                        store.storeIdx, store.name, store.address, store.latitude, store.longitude,
                        review.rating.avg(),
                        pickedStore.storeId.count(),
                        review.reviewIdx.count(),
                        storeImage.imagePath,
                        store._super.modifiedAt,
                        new CaseBuilder()
                                .when(normal.userIdx.eq(userIdx)).then(true)
                                .otherwise(false)
                                .as("picked")
                ))
                .from(store)
                .leftJoin(store.reviews, review)
                .leftJoin(store.pickedStores, pickedStore)
                .leftJoin(pickedStore.normal,normal)
                .leftJoin(store.storeImages, storeImage)
                .where(store.name.contains(keyword))
                .groupBy(store.storeIdx,storeImage.imagePath, normal.userIdx)
                .fetch();
    }
    public List<DBStoreSearchDto> searchStoreByAddress(String keyword, Long userIdx) {
        return queryFactory
                .select(new QDBStoreSearchDto(
                        store.storeIdx, store.name, store.address, store.latitude, store.longitude,
                        review.rating.avg(),
                        pickedStore.storeId.count(),
                        review.reviewIdx.count(),
                        storeImage.imagePath,
                        store._super.modifiedAt,
                        new CaseBuilder()
                                .when(normal.userIdx.eq(userIdx)).then(true)
                                .otherwise(false)
                                .as("picked")
                ))
                .from(store)
                .leftJoin(store.reviews, review)
                .leftJoin(store.pickedStores, pickedStore)
                .leftJoin(pickedStore.normal,normal)
                .leftJoin(store.storeImages, storeImage)
                .where(store.address.contains(keyword))
                .groupBy(store.storeIdx,storeImage.imagePath, normal.userIdx)
                .fetch();
    }


    public List<Store> findByIdxs(List<Long> storeIdx) {
        return queryFactory
                .selectFrom(store)
                .where(store.storeIdx.in(storeIdx))
                .fetch();
    }

    //내부 동작 쿼리 orderBy
    private OrderSpecifier orderByCondition(String sortCondition) {
        return Expressions.stringPath(sortCondition).desc();
    }

    //내부동작 쿼리 where 절
    private BooleanExpression getDistanceCondition(Expression<Double> latitude, Expression<Double> longitude, Expression<Double> distanceCond) {
        return acos(sin(radians(store.latitude))
                .multiply(sin(radians(latitude)))
                .add(cos(radians(store.latitude))
                        .multiply(cos(radians(latitude)))
                        .multiply(cos(radians(store.longitude.subtract(longitude)))))).multiply(RADIUS_EARTH_KM).loe(distanceCond);
    }


    private BooleanExpression getOperatingCondition(boolean isHoliday, String filterCond, Long userIdx) {     //operating
        //holliday인가 ? null ->  필터링 로직
        if (filterCond.equals("not") ) {
            return null;
        } else if (filterCond.equals("bookmark")) {
            return getPickedStoreOperating(userIdx);
        }

        //holiday 일 경우
        if (!isHoliday && filterCond.equals("operatingTime")) {
            return getNormalOperatingCondition();
        } else if (isHoliday && filterCond.equals("operatingTime")) {
            return getHolidayOperatingCondition();
        } else if (!isHoliday && filterCond.equals("nightOperating")) {
            return getNormalNightOperating();
        } else {
            return getHolidayOperating();
        }

    }

    private BooleanExpression getNormalNightOperating() {
        DayOfWeek dayOfWeek = LocalDate.now().getDayOfWeek();
        switch (dayOfWeek) {
            case MONDAY:
                return store.mondayOperating.endTime.after(LocalTime.of(22,0,0));
            case THURSDAY:
                return store.thursdayOperating.endTime.after(LocalTime.of(22,0,0));
            case WEDNESDAY:
                return store.wednesdayOperating.endTime.after(LocalTime.of(22,0,0));
            case TUESDAY:
                return store.tuesdayOperating.endTime.after(LocalTime.of(22,0,0));
            case FRIDAY:
                return store.fridayOperating.endTime.after(LocalTime.of(22,0,0));
            case SATURDAY:
                return store.saturdayOperating.endTime.after(LocalTime.of(22,0,0));
            default:
                return store.sundayOperating.endTime.after(LocalTime.of(22,0,0));
        }
    }

    private BooleanExpression getHolidayOperating() {
        return store.holidayOperating.endTime.after(LocalTime.of(22,0,0));
    }

    private BooleanExpression getPickedStoreOperating(Long userIdx) {
        return pickedStore.normal.userIdx.eq(userIdx);
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

    private BooleanExpression searchWithName(String name) {
        return store.name.contains(name);
    }

    private BooleanExpression searchWithAddress(String address) {
        return store.address.contains(address);
    }
}
