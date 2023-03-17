package com.project.mainproject.user.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;
@SuperBuilder
@Getter
@Entity
@NoArgsConstructor
@Table(name = "USER_NORMAL")
public class Normal extends User {
    @OneToMany
    @Builder.Default
    private List<PickedStore> pickedStores = new ArrayList<>();

    public void addStore(PickedStore pickedStore) {
        this.pickedStores.add(pickedStore);
    }

}
