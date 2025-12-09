package com.blog.auth.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    @Value("${JWT_SECRET}")
    private String jwtSecret;
    
    public String generateJwt(Long id, String username) {
        long currentTime = System.currentTimeMillis();
        long expirationTime = currentTime + 30 * 60 * 1000;

        Map<String, String> claims = Map.of(
            "username", username
        );

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(currentTime))
                .setExpiration(new Date(expirationTime))
                .setSubject(String.valueOf(id))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
        }
        
        private Key getKey() {
            return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        }
}
