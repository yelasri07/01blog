package com.blog.post.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateBlogDTO(
    @NotBlank(message = "Title should not be empty")
    @Size(min = 5, max = 200, message = "Title should be between 5 and 200 characters")
    String title,

    @NotBlank(message = "Content should not be empty")
    @Size(min = 15, max = 10000, message = "Content should be between 15 and 10000 characters")
    String content) {

    public CreateBlogDTO {
        title = title == null ? null : title.trim();
        content = content == null ? null : content.trim();
    }
}
