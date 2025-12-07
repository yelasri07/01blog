package com.blog.auth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.dto.LoginDTO;
import com.blog.auth.dto.RegisterDTO;
import com.blog.auth.service.AuthService;

@RestController
public class AuthRestController {

    @Autowired
    private AuthService authService;

    @GetMapping("/home")
    public String home() {
        return "Welcome home page";
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterDTO userData) throws Exception {
        authService.createUser(userData);
    }

    @PostMapping("/login")
    public void login(@RequestBody LoginDTO userData) {
        
    }
}
