package com.blog.post.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record CommentOutputDTO(
    Long id,
    String content,
    Timestamp created_at,
    Long blog_id,
    Long user_id,
    String username,
    @JsonProperty("profile_image")
    String profileImage
) {
    
}
