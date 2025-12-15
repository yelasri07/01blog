package com.blog.post.dto;

import java.sql.Timestamp;

import lombok.Builder;

@Builder
public record BlogOutputDTO(
        Long id,
        String title,
        String content,
        Timestamp created_at,
        Long user_id,
        String username) {
}
