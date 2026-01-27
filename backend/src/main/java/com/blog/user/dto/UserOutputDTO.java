package com.blog.user.dto;

import java.sql.Timestamp;

import com.blog.user.model.RoleEnum;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record UserOutputDTO(
        Long id,
        String username,
        String email,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        RoleEnum role,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        String token,
        @JsonProperty("its_me")
        @JsonInclude(JsonInclude.Include.NON_NULL)
        Boolean itsMe,
        @JsonProperty("created_at") Timestamp createdAt) {

}
