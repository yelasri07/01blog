package com.blog.auth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.dto.AuthDTO;
import com.blog.auth.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthRestController {

    @Autowired
    private AuthService authService;
    
    @GetMapping("/home")
    public String home() {
        return "Welcome home page";
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@Valid @RequestBody AuthDTO.RegisterDTO userData) {
        authService.createUser(userData);
    }
    
    @PostMapping("/login")
    public String login(@RequestBody AuthDTO.LoginDTO userData) throws AuthenticationException {
        return authService.userConnexion(userData);
    }
}
