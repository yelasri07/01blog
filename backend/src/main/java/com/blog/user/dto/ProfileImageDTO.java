package com.blog.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;

public record ProfileImageDTO(
    @NotNull(message = "url should not be empty or null")
    String url,
    @JsonProperty("public_id")
    @NotNull(message = "publicId should not be empty or null")
    String publicId
) {
    
}
