package com.blog.auth.mapper;

import org.springframework.stereotype.Component;

import com.blog.user.dto.UserOutputDTO;
import com.blog.user.model.UserEntity;

@Component
public class AuthMapper {
    
    public UserOutputDTO toUserOutputDTO(UserEntity user, String token) {
        return UserOutputDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().toString())
                .createdAt(user.getCreated_at())
                .token(token)
                .build();
    }

}
