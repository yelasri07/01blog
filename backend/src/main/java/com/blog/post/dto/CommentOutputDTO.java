package com.blog.post.dto;

import java.sql.Timestamp;

import lombok.Builder;

@Builder
public record CommentOutputDTO(
    Long id,
    String content,
    Timestamp created_at,
    Long blog_id,
    Long user_id,
    String username
) {
    
}
