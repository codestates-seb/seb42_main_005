package com.project.mainproject.store.entity;

import com.project.mainproject.VO.OperatingTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Store {
    @Id
    @GeneratedValue
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
            @AttributeOverride(name="startTime",column = @Column(name = "HOLIDAY_OPERATING_START")),
            @AttributeOverride(name = "endTime", column = @Column(name = "HOLIDAY_OPERATING_END"))
    })
    private OperatingTime holidayOperating;


    //추 후 변경 필요
    private Boolean isOperatingHoliday;

    private String etc;

}
