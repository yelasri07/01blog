package com.blog.auth.service;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.auth.dto.LoginDTO;
import com.blog.auth.dto.RegisterDTO;
import com.blog.auth.security.JwtUtil;
import com.blog.user.Model.UserEntity;
import com.blog.user.persistence.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    PasswordEncoder encoder;

    public void createUser(RegisterDTO userData) throws Exception {
        if (userData.getUsername() == null) {
            throw new Exception("username most not be null");
        }

        UserEntity user = UserEntity.builder()
                .username(userData.getUsername())
                .email(userData.getEmail())
                .password(encoder.encode(userData.getPassword()))
                .created_at(Timestamp.valueOf("2004-04-06 12:40:10"))
                .build();

        userRepository.save(user);
    }

    public String loginUser(LoginDTO userData) throws UsernameNotFoundException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userData.getUsername(),
                        userData.getPassword()));

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails.getUsername());

        return token;
    }

}
