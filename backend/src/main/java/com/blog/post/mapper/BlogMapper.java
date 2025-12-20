package com.blog.post.mapper;

import org.springframework.stereotype.Component;

import com.blog.post.dto.BlogOutputDTO;
import com.blog.post.model.BlogEntity;

@Component
public class BlogMapper {

    public BlogOutputDTO toBlogOutputDTO(BlogEntity blog) {
        return BlogOutputDTO.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .content(blog.getContent())
                .created_at(blog.getCreated_at())
                .user_id(blog.getUser().getId())
                .username(blog.getUser().getUsername())
                .build();
    }

}
