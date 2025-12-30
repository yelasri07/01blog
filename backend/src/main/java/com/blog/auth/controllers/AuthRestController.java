package com.blog.auth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.dto.AuthDTO;
import com.blog.auth.security.JwtService;
import com.blog.auth.service.AuthService;
import com.blog.user.dto.UserOutputDTO;
import com.blog.user.model.UserEntity;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthRestController {

    @Autowired
    private AuthService authService;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserOutputDTO register(@Valid @RequestBody AuthDTO.RegisterDTO userData) {
        UserEntity user = authService.createUser(userData);

        String token = jwtService.generateJwt(user.getId(), user.getUsername());

        return UserOutputDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .createdAt(user.getCreated_at())
                .token(token)
                .build();
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthDTO.LoginDTO userData) throws AuthenticationException {
        UserEntity user = authService.userConnexion(userData);
        String token = jwtService.generateJwt(user.getId(), user.getUsername());

        return token;
    }
}
