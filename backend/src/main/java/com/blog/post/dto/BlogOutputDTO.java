package com.blog.post.dto;

import java.sql.Timestamp;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record BlogOutputDTO(
        Long id,
        String title,
        Map<String, Object> content,
        Timestamp created_at,
        @JsonProperty("like_count")
        Long likeCount,
        Long user_id,
        String username) {
}
