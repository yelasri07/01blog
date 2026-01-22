package com.blog.post.dto;

import java.util.Map;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateBlogDTO(
    @NotBlank(message = "Title should not be empty")
    @Size(min = 5, max = 200, message = "Title should be between 5 and 200 characters")
    String title,
    Map<String, Object> content) {

    public CreateBlogDTO {
        title = title == null ? null : title.trim();
    }
}
