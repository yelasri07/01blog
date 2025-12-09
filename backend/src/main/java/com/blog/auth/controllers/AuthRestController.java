package com.blog.auth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.blog.auth.dto.AuthDTO;
import com.blog.auth.service.AuthService;

@RestController
public class AuthRestController {

    @Autowired
    private AuthService authService;
    @Autowired
    private AuthenticationManager authenticationManager;    
    
    @GetMapping("/home")
    public String home() {
        return "Welcome home page";
    }

    @PostMapping("/register")
    public void register(@RequestBody AuthDTO.RegisterDTO userData) throws Exception {
        authService.createUser(userData);
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthDTO.LoginDTO userData) throws UsernameNotFoundException {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(userData.getUsername(), userData.getPassword())
        );

        if (authentication.isAuthenticated()) {
            
        }

        return null;
    }
}
