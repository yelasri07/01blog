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
import com.blog.exception.UnauthorizedException;
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

    public void createUser(AuthDTO.RegisterDTO userData) {
        UserEntity user = UserEntity.builder()
                .username(userData.getUsername())
                .email(userData.getEmail())
                .password(passwordEncoder.encode(userData.getPassword()))
                .created_at(Timestamp.valueOf("2004-04-06 12:40:10"))
                .build();

        userRepository.save(user);
    }

    public String userConnexion(AuthDTO.LoginDTO userData) throws AuthenticationException {
        userData.setUsername(userData.getUsername().trim());
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
            String token = jwtService.generateJwt(user.getId(), user.getUsername());

            return token;
        } catch (AuthenticationException ex) {
            throw new UnauthorizedException("Username or password is incorrect");
        }
    }
}
