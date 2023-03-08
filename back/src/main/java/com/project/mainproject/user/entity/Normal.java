package com.project.mainproject.user.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@Table(name = "USER_NORMAL")
@NoArgsConstructor(access = PROTECTED)
public class Normal extends User {
    @OneToMany
    private List<PickedStore> pickedStores = new ArrayList<>();

//    @Builder
    public Normal(String userID,
                  String password,
                  String email,
                  String name,
                  LocalDateTime DOB) {
        super(userID, password, email, name, DOB);
        this.pickedStores= new ArrayList<>();
    }

    public void addStore(PickedStore pickedStore) {
        this.pickedStores.add(pickedStore);
    }


}
