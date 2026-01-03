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
import com.blog.exception.ConflictException;
import com.blog.exception.UnauthorizedException;
import com.blog.user.model.RoleEnum;
import com.blog.user.model.UserEntity;
import com.blog.user.persistence.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    public UserEntity createUser(AuthDTO.RegisterDTO userData) {
        if (userRepository.existsByUsername(userData.getUsername())) {
            throw new ConflictException("Username already exists", "username");
        }

        if (userRepository.existsByEmail(userData.getEmail())) {
            System.out.println("sdfsdfsdsdsd");
            throw new ConflictException("Email already exists", "email");
        }

        UserEntity user = UserEntity.builder()
                .username(userData.getUsername())
                .email(userData.getEmail())
                .password(passwordEncoder.encode(userData.getPassword()))
                .created_at(new Timestamp(System.currentTimeMillis()))
                .role(RoleEnum.USER)
                .build();

        return userRepository.save(user);
    }

    public UserEntity userConnexion(AuthDTO.LoginDTO userData) throws AuthenticationException {
        userData.setUsername(userData.getUsername());
        String username = userData.getUsername();
        String password = userData.getPassword();
        if (username == null || username.isBlank() || username.length() > 100
                || password == null || password.length() < 8 || password.length() > 30) {
            throw new UnauthorizedException("Username or password is incorrect");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userData.getUsername(), userData.getPassword()));

            UserEntity user = (UserEntity) authentication.getPrincipal();

            return user;
        } catch (AuthenticationException ex) {
            throw new UnauthorizedException("Username or password is incorrect");
        }
    }
}
