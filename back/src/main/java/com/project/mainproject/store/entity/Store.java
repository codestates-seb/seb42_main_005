package com.project.mainproject.store.entity;

import com.project.mainproject.VO.OperatingTime;
import com.project.mainproject.audit.Auditable;
import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.enums.ReviewStatus;
import com.project.mainproject.user.entity.PickedStore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static javax.persistence.CascadeType.REMOVE;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name = "STORE")
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
public class Store extends Auditable {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long storeIdx;
    @Column(name = "STORE_HPID")
    private String hpid;
    @Column(name = "STORE_NAME")
    private String name;
    @Column(name = "STORE_ADDRESS")
    private String address;
    @Column(name = "STORE_LONGITUDE")
    private Double longitude;
    @Column(name = "STORE_LATITUDE")
    private Double latitude;
    @Column(name = "STORE_TEL")
    private String tel;

    @Enumerated
    @AttributeOverrides({
            @AttributeOverride(name="startTime",column = @Column(name = "MONDAY_OPERATING_START")),
            @AttributeOverride(name = "endTime", column = @Column(name = "MONDAY_OPERATING_END"))
    })
    private OperatingTime mondayOperating;
    @Enumerated
    @AttributeOverrides({
            @AttributeOverride(name="startTime",column = @Column(name = "TUESDAY_OPERATING_START")),
            @AttributeOverride(name = "endTime", column = @Column(name = "TUESDAY_OPERATING_END"))
    })
    private OperatingTime tuesdayOperating;
    @Enumerated
    @AttributeOverrides({
            @AttributeOverride(name="startTime",column = @Column(name = "WEDNESDAY_OPERATING_START")),
            @AttributeOverride(name = "endTime", column = @Column(name = "WEDNESDAY_OPERATING_END"))
    })
    private OperatingTime wednesdayOperating;
    @Enumerated
    @AttributeOverrides({
            @AttributeOverride(name="startTime",column = @Column(name = "THURSDAY_OPERATING_START")),
            @AttributeOverride(name = "endTime", column = @Column(name = "THURSDAY_OPERATING_END"))
    })
    private OperatingTime thursdayOperating;
    @Enumerated
    @AttributeOverrides({
            @AttributeOverride(name="startTime",column = @Column(name = "FRIDAY_OPERATING_START")),
            @AttributeOverride(name = "endTime", column = @Column(name = "FRIDAY_OPERATING_END"))
    })
    private OperatingTime fridayOperating;
    @Enumerated
    @AttributeOverrides({
            @AttributeOverride(name="startTime",column = @Column(name = "SATURDAY_OPERATING_START")),
            @AttributeOverride(name = "endTime", column = @Column(name = "SATURDAY_OPERATING_END"))
    })
    private OperatingTime saturdayOperating;
    @Enumerated
    @AttributeOverrides({
            @AttributeOverride(name = "startTime", column = @Column(name = "SUNDAY_OPERATING_START")),
            @AttributeOverride(name = "endTime", column = @Column(name = "SUNDAY_OPERATING_END"))
    })
    private OperatingTime sundayOperating;
    @Enumerated
    @AttributeOverrides({
            @AttributeOverride(name = "startTime", column = @Column(name = "HOLIDAY_OPERATING_START")),
            @AttributeOverride(name = "endTime", column = @Column(name = "HOLIDAY_OPERATING_END"))
    })
    private OperatingTime holidayOperating;

    //추 후 변경 필요
    private Boolean isOperatingHoliday;

    private String etc;

    //연관관계 매핑
    @OneToOne(mappedBy = "store",cascade = CascadeType.ALL)
    private StoreImage storeImages;

    @OneToMany(mappedBy = "store", cascade = REMOVE, orphanRemoval = true)
    private List<Review> reviews;

    @OneToMany(mappedBy = "store",fetch = LAZY)
    private List<PickedStore> pickedStores;

    public void addStoreImage(StoreImage storeImages) {
        this.storeImages = storeImages;
    }

    public double getRatingAvg() {
        int [] ratings = this.reviews.stream().mapToInt(r -> r.getRating()).toArray();
        return Arrays.stream(ratings).average().orElse(0);
    }

    public long getPickedStoreCount() {
        return this.getPickedStores().stream().distinct().count();
    }

    public long getReviewCount() {
        if (reviews.size() == 0) {
            return 0;
        }
        reviews = this.reviews.stream().distinct().collect(Collectors.toList());
        reviews.removeIf(review -> review.getReviewStatus().equals(ReviewStatus.DELETED));
        return this.reviews.size();
    }

    public String getStoreImagePath() {
        Optional<StoreImage> storeImages = Optional.ofNullable(this.storeImages);
        if (storeImages.isPresent()) {
            return storeImages.get().getImagePath();
        }
        return null;
    }
}
