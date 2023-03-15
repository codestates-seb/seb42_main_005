package com.project.mainproject.store.entity;

import com.project.mainproject.VO.OperatingTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
public class Store {
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
    @Formula("SELECT round(AVG(rating), 2) AS rating FROM review GROUP BY store_idx")
    private Double rating;

    //연관관계 매핑
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StoreImage> storeImages;
}
