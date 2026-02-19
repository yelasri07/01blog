package com.blog.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record UserSearchDTO(
    Long id,
    String username,
    @JsonProperty("profile_image")
    String profileImage
) {
    
}
