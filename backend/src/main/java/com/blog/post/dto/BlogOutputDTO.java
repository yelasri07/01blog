package com.blog.post.dto;

import java.sql.Timestamp;
import java.util.Map;

import lombok.Builder;

@Builder
public record BlogOutputDTO(
        Long id,
        String title,
        Map<String, Object> content,
        Timestamp created_at,
        Long user_id,
        String username) {
}
