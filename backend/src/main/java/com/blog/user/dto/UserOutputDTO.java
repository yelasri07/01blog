package com.blog.user.dto;

import java.sql.Timestamp;

import com.blog.user.model.RoleEnum;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record UserOutputDTO(
        Long id,
        String username,
        String email,
        RoleEnum role,
        String token,
        @JsonProperty("created_at") Timestamp createdAt) {

}
