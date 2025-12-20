package com.blog.post.dto;

import java.sql.Timestamp;

import lombok.Builder;

@Builder
public record AllBlogsOutputDTO(
        Long id,
        String title,
        Timestamp created_at,
        Long user_id,
        String username) {
}
