package com.blog.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record UserProfileOutputDTO(
        Long id,
        String username,
        String email,
        @JsonProperty("followers_count")
        Long followersCount,
        @JsonProperty("following_count")
        Long followingCount,
        Boolean subscribe
    ) {

}
