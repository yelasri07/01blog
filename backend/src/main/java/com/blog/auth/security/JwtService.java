package com.blog.auth.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Service
public class JwtService {
    @Value("${JWT_SECRET}")
    private String jwtSecret;
    private SecretKey key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateJwt(Long id, String username) {
        long currentTime = System.currentTimeMillis();
        long expirationTime = currentTime + (60 * 24) * 60 * 1000;

        Map<String, String> claims = Map.of(
                "username", username);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(currentTime))
                .setExpiration(new Date(expirationTime))
                .setSubject(String.valueOf(id))
                .signWith(this.key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Long getIdFromToken(String token) {
        return Long.valueOf(getClaims(token).getSubject());
    }

    public boolean IsValidToken(String token, UserDetails userDetails) {
        return true;
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(this.key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
