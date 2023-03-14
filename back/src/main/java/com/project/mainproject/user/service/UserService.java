package com.project.mainproject.user.service;

import com.project.mainproject.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class UserService {
    private UserRepository storeRepository;


}