package com.project.mainproject.user.service;

import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.security.CustomAuthorityUtils;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.repository.StoreRepository;
import com.project.mainproject.user.dto.UserInfoDto;
import com.project.mainproject.user.dto.UserPatchDto;
import com.project.mainproject.user.entity.Normal;
import com.project.mainproject.user.entity.Pharmacy;
import com.project.mainproject.user.entity.User;
import com.project.mainproject.user.enums.UserStatus;
import com.project.mainproject.user.exception.UserExceptionCode;
import com.project.mainproject.user.mapper.UserMapper;
import com.project.mainproject.user.repository.PharmacyRepository;
import com.project.mainproject.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private UserMapper userMapper;
    private PharmacyRepository pharmacyRepository;
    private PasswordEncoder encoder;
    private CustomAuthorityUtils authorityUtils;
    private StoreRepository storeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        User user = userRepository.findByEmail(username).get();
        List<GrantedAuthority> authority = new ArrayList<>();
        authority.add(new SimpleGrantedAuthority("ROLE_" + user.getRole()));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(), user.getPassword(), authority);
    }

    public void saveNormal(Normal normal) {
        normal.setUserType("일반회원");
        normal.setPassword(encoder.encode(normal.getPassword()));
        assignRole(normal);
        userRepository.save(normal);
    }

    public void assignRole(Normal user) {
        List<String> roles = authorityUtils.createNormalRoles(user.getEmail());
    }

    public void savePharmacy(Pharmacy pharmacy, MultipartFile businessCertificate, MultipartFile pharmacistCertificate) {
        Optional<Store> store = storeRepository.findByNameContainingAndAddressContaining(pharmacy.getName(), pharmacy.getAddress());
        if(store.isPresent()) {
            pharmacy.setPassword(encoder.encode(pharmacy.getPassword()));
            pharmacy.setStore(store.get());
            pharmacy.setUserType("약국회원");
            Pharmacy save = userRepository.save(pharmacy);
            File businessFile = new File("/Users/gimjihyeong/businessCertificate");
            if(!businessFile.exists()) businessFile.mkdirs();

            Path businessLocation = Paths.get("/Users/gimjihyeong/businessCertificate").toAbsolutePath().normalize();
            String businessName = UUID.randomUUID().toString();
            try {
                Path targetLocation = businessLocation.resolve(businessName);
                Files.copy(businessCertificate.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                String path = targetLocation.toString();

                Pharmacy pharmacyPath = pharmacyRepository.findById(save.getUserIdx()).get();
                pharmacyPath.setBusinessCertificate(path);

                pharmacyRepository.save(pharmacyPath);
            } catch (Exception e) {
                e.printStackTrace();
            }

            File pharmacistFile = new File("/Users/gimjihyeong/pharmacistCertificate");
            if(!pharmacistFile.exists()) pharmacistFile.mkdirs();

            Path pharmacistLocation = Paths.get("/Users/gimjihyeong/pharmacistCertificate").toAbsolutePath().normalize();
            String pharmacistName = UUID.randomUUID().toString();
            try {
                Path targetLocation = pharmacistLocation.resolve(pharmacistName);
                Files.copy(pharmacistCertificate.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
                String path = targetLocation.toString();

                Pharmacy pharmacyPath = pharmacyRepository.findById(save.getUserIdx()).get();
                pharmacyPath.setPharmacistCertificate(path);

                pharmacyRepository.save(pharmacyPath);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return ; //TODO

    }

    @Transactional(readOnly = true)
    public UserInfoDto findUser(Long userIdx) {
        User user = userRepository.findById(userIdx).get();
        UserInfoDto userInfoDto = userMapper.userToUserInfoDto(user);
        return userInfoDto;
    }

    @Transactional(readOnly = true)
    public Page<User> findUsers(Pageable pageable) {
        return userRepository.findAll(pageable);

    }

    public Page<Pharmacy> findPharmacyRequest(Pageable pageable) {
        return pharmacyRepository.findAllByUserStatusIs(UserStatus.TEMPORARY, pageable);
    }

    public void patchUser(Long userIdx, UserPatchDto userPatchDto) {
        User user = userRepository.findById(userIdx).get();
        userMapper.userPatchDtoToUser(userPatchDto, user);
        userRepository.save(user);
    }

    public void patchUserProfile(Long userIdx, MultipartFile profileImage) {
        User user = userRepository.findById(userIdx).get();
        String deletePath = user.getImagePath();
        System.out.println(deletePath);
        File deleteFile = new File(deletePath);
        System.out.println(deleteFile.exists());
        if(deleteFile.exists()) {
            deleteFile.delete();
        }
        Path fileLocation = Paths.get("/Users/gimjihyeong/profile").toAbsolutePath().normalize();
        String profileName = UUID.randomUUID().toString();
        try {
            Path targetLocation = fileLocation.resolve(profileName);
            Files.copy(profileImage.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            String path = targetLocation.toString();
            user.setImagePath(path);
            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void deleteUser(Long userIdx) {
        User user = userRepository.findById(userIdx).get();
        user.setUserStatus(UserStatus.WITHDRAWN);
        userRepository.save(user);
    }

    /*
    * User가 존재하지 않으면 예외 처리를 수행한다.
    * */
    public User validUser(Long userIdx) {
        Optional<User> findUser = userRepository.findById(userIdx);

        if (findUser.isPresent()) {
            return findUser.get();
        }
        throw new BusinessLogicException(UserExceptionCode.USER_NOT_FOUND);
    }

    /*
     * User가 존재하면 예외 처리를 수행한다.
     * */
    public void checkUserExist(Long userIdx) {
        Optional<User> findUser = userRepository.findById(userIdx);
        findUser.ifPresent(
                user -> new BusinessLogicException(UserExceptionCode.USER_EXIST)
        );
    }

    /*
     * 약사인지 검증하는 로직
     * */
    public Pharmacy checkIsPharmacy(Long userIdx) {
        User user = validUser(userIdx);
        if (!(user instanceof Pharmacy)) {
            throw new BusinessLogicException(UserExceptionCode.USER_NOT_PHARMACY);
        }
        return (Pharmacy) user;
    }
    public void checkIstPharmacy(User user) {
        if (!(user instanceof Pharmacy)) {
            throw new BusinessLogicException(UserExceptionCode.USER_NOT_PHARMACY);
        }
    }
}