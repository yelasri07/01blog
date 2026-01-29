package com.blog.user.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record UserOutputDTO(
        Long id,
        String username,
        String email,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        @JsonProperty("profile_image")
        String profileImage,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        String role,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        String token,
        @JsonProperty("created_at") Timestamp createdAt) {

}
