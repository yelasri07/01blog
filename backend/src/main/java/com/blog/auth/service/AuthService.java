package com.blog.auth.service;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.auth.dto.AuthDTO;
import com.blog.auth.security.JwtService;
import com.blog.user.Model.UserEntity;
import com.blog.user.persistence.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    public void createUser(AuthDTO.RegisterDTO userData) throws Exception {
        if (userData.getUsername() == null) {
            throw new Exception("username most not be null");
        }

        UserEntity user = UserEntity.builder()
                .username(userData.getUsername())
                .email(userData.getEmail())
                .password(passwordEncoder.encode(userData.getPassword()))
                .created_at(Timestamp.valueOf("2004-04-06 12:40:10"))
                .build();

        userRepository.save(user);
    }

    public String userConnexion(AuthDTO.LoginDTO userData) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userData.getUsername(), userData.getPassword()));

        UserEntity user = (UserEntity) authentication.getPrincipal();
        String token = jwtService.generateJwt(user.getId(), user.getUsername());

        return token;
    }
}
