package com.blog.auth.service;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.auth.dto.RegisterDTO;
import com.blog.user.Model.UserEntity;
import com.blog.user.persistence.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    
    public void createUser(RegisterDTO userData) throws Exception {
        if (userData.getUsername() == null) {
            throw new Exception("username most not be null");
        }

        UserEntity user = UserEntity.builder()
                                    .username(userData.getUsername())
                                    .email(userData.getEmail())
                                    .password(userData.getPassword())
                                    .created_at(Timestamp.valueOf("2004-04-06 12:40:10"))
                                    .build();

        userRepository.save(user);
    } 

}
