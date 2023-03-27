package com.project.mainproject.user.service;

import com.project.mainproject.exception.BusinessLogicException;
import com.project.mainproject.security.CustomAuthorityUtils;
import com.project.mainproject.security.UserContext;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.repository.StoreRepository;
import com.project.mainproject.user.dto.PharmacyInfoDto;
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
import com.project.mainproject.utils.FileUploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static com.project.mainproject.store.exception.StoreExceptionCode.STORE_ADDRESS_NOT_FOUND;
import static com.project.mainproject.store.exception.StoreExceptionCode.STORE_NAME_NOT_FOUND;
import static com.project.mainproject.user.enums.UserStatus.TEMPORARY;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PharmacyRepository pharmacyRepository;
    private final PasswordEncoder encoder;
    private final CustomAuthorityUtils authorityUtils;
    private final StoreRepository storeRepository;
    private final FileUploader fileUploader;
    private final ApplicationEventPublisher publisher;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        User user = userRepository.findByEmail(username).get();
        List<GrantedAuthority> authority = new ArrayList<>();
        authority.add(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
        String userId = user.getUserIdx().toString();
//        return new org.springframework.security.core.userdetails.User(
//                user.getEmail(), user.getPassword(), authority);
        return new UserContext(userId, user.getEmail(), user.getPassword(), authority);
    }

    public void saveNormal(Normal normal) {
        checkUserExist(normal.getEmail());
        checkPassword(normal.getPassword());
        normal.setUserType("일반회원");
        normal.setPassword(encoder.encode(normal.getPassword()));
        assignRole(normal);
        userRepository.save(normal);
    }

    public void assignRole(Normal user) {
        List<String> roles = authorityUtils.createNormalRoles(user.getEmail());
        user.setRole(roles); // 추가했습니다 03/25 예솔
    }

    public void assignRole(Pharmacy user) { // 추가했습니다 03/25 예솔
        List<String> roles = authorityUtils.createPharmacyRoles(user.getEmail());
        user.setRole(roles);
    }

    public void savePharmacy(Pharmacy pharmacy, MultipartFile businessCertificate, MultipartFile pharmacistCertificate) {
        checkUserExist(pharmacy.getEmail());
        checkPassword(pharmacy.getPassword());

        List<Store> stores = storeRepository.findByNameContaining(pharmacy.getName()); // 검색 이슈로 추가 03/25 예솔
        if (stores.size() == 0)
            throw new BusinessLogicException(STORE_NAME_NOT_FOUND);
        Store store = filterCorrcetStore(stores, pharmacy.getAddress());

        pharmacy.setPassword(encoder.encode(pharmacy.getPassword()));
        pharmacy.setStore(store);
        pharmacy.setUserType("약국회원");
        pharmacy.setUserStatus(TEMPORARY);
        assignRole(pharmacy); // 추가했습니다 03/25 예솔

        String businessPath = fileUploader.saveImage(businessCertificate, "businessCertificate");
        String pharmacyPath = fileUploader.saveImage(pharmacistCertificate, "pharmacistCertificate");

        pharmacy.setBusinessCertificate(businessPath);
        pharmacy.setPharmacistCertificate(pharmacyPath);
        userRepository.save(pharmacy);
    }

    private Store filterCorrcetStore(List<Store> stores, String address) {
        stores = stores.stream()
                .filter(store -> store.getAddress().replace(" ", "")
                        .contains(removeSpace(address)))
                .collect(Collectors.toList());
        if (stores.size() != 1)
            throw new BusinessLogicException(STORE_ADDRESS_NOT_FOUND);

        return stores.get(0);
    }

    // 위치...
    private String removeSpace(String address) {
        String[] words = address.split(" ");
        if (words.length < 4)
            throw new BusinessLogicException(STORE_ADDRESS_NOT_FOUND);

        return words[1] + words[2] + words[3];
    }

    @Transactional(readOnly = true)
    public UserInfoDto findUser(Long userIdx) {
        User user = userRepository.findById(userIdx).get();
        UserInfoDto userInfoDto = userMapper.userToUserInfoDto(user);
        return userInfoDto;
    }

    @Transactional(readOnly = true)
    public Page<UserInfoDto> findUsers(Pageable pageable) {
        return userRepository.findUserInfoWithBannedStoreDate(pageable);

    }

    public Page<PharmacyInfoDto> findPharmacyRequest(Pageable pageable) {
        Page<Pharmacy> pharmacyPage = pharmacyRepository.findAllByUserStatusIs(TEMPORARY, pageable);
        Page<PharmacyInfoDto> pharmacyInfoDtoPage = pharmacyPage.map(PharmacyInfoDto::new);
        return pharmacyInfoDtoPage;
    }

    public void patchUser(Long userIdx, UserPatchDto userPatchDto) {
        User user = userRepository.findById(userIdx).get();
        if(encoder.matches(userPatchDto.getPassword(), user.getPassword())) {
            if (userPatchDto.getAddress() != null) user.setAddress(userPatchDto.getAddress());
            if (userPatchDto.getName() != null) user.setName(userPatchDto.getName());
            if (userPatchDto.getNewPassword() != null) {
                user.setPassword(encoder.encode(userPatchDto.getNewPassword()));
                userRepository.save(user);
            }
        }
        else {
            throw new BusinessLogicException(UserExceptionCode.PASSWORD_NOT_MATCHED);
        }
    }

    public void patchUserProfile(Long userIdx, MultipartFile uploadFile) {
        User findUser = validUser(userIdx);
        String userProfile = "";
        if (findUser.getImagePath() == null) {
            userProfile = fileUploader.saveImage(uploadFile, "userProfile");
        } else {
            userProfile = fileUploader.patchImage(uploadFile, findUser.getImagePath(), "userProfile");
        }
        findUser.setImagePath(userProfile);
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
    public void checkUserExist(String email) {
        Optional<User> findUser = userRepository.findByEmail(email);
        if(findUser.isPresent()) {
            throw new BusinessLogicException(UserExceptionCode.USER_EXIST);
        }
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

    /*
     * normal User인지 확인하는 로직
     * */
    public Normal checkIsNormal(Long userIdx) {
        User findUser = validUser(userIdx);

        if (!(findUser instanceof Normal)) {
            throw new BusinessLogicException(UserExceptionCode.USER_NOT_NORMAL);
        }
        return (Normal) findUser;
    }

    /*
        비밀번호 검증 로직
     */
    public void checkPassword(String password) {
        Pattern pattern = Pattern.compile("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$");
        Matcher matcher = pattern.matcher(password);
        if (!matcher.find()) {
            throw new BusinessLogicException(UserExceptionCode.CONFLICT_PASSWORD_RULE);
        }
    }
}