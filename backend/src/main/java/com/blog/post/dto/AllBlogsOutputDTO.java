package com.blog.post.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record AllBlogsOutputDTO(
        Long id,
        String title,
        Timestamp created_at,
        Long user_id,
        String username,
        @JsonProperty("profile_image")
        String profileImage,
        @JsonProperty("like_count")
        Long likeCount,
        Boolean like) {
}
