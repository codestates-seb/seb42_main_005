package com.project.mainproject.user.mapper;

import com.project.mainproject.user.dto.UserInfoDto;
import com.project.mainproject.user.dto.UserPatchDto;
import com.project.mainproject.user.dto.UserSignUpDto;
import com.project.mainproject.user.entity.Normal;
import com.project.mainproject.user.entity.Pharmacy;
import com.project.mainproject.user.entity.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper{
    Normal normalSignUpDtoToUser(UserSignUpDto userSignUpDto);
    Pharmacy pharmacySignUpDtoToUser(UserSignUpDto userSignUpDto);
    UserInfoDto userToUserInfoDto(User user);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void userPatchDtoToUser(UserPatchDto userPatchDto, @MappingTarget User user);

}
