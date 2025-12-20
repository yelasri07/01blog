package com.blog.post.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateCommentDTO(
    @NotBlank(message = "Comment content should not be empty")
    @Size(min = 1, max = 1000, message = "Comment content should be between 1 and 1000 characters")
    String content
) {
    
    public CreateCommentDTO {
        content = content == null ? null : content.trim();
    }

}
