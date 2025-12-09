package com.blog.auth.security;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;

@Service
public class JwtService {
    
    public String generateJwt(Long id, String username) {
        long currentTime = System.currentTimeMillis();
        long expiredTime = currentTime + 30 * 60 * 1000;

        // Jwts.builder()
        //         .setIssuedAt()

        return "dfsdfdsfdsa";
    }
     
}
