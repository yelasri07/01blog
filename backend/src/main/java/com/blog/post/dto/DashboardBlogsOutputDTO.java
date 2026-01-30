package com.blog.post.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

public record DashboardBlogsOutputDTO(
    Long id,
    String title,
    @JsonProperty("created_at")
    Timestamp createdAt,
    @JsonProperty("is_hidden")
    Boolean isHidden
) {
    
}
