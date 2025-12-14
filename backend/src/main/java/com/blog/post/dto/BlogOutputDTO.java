package com.blog.post.dto;

import lombok.Builder;

@Builder
public record BlogOutputDTO(
        Long id,
        String title,
        String content) {
}
