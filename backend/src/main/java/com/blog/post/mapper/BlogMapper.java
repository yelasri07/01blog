package com.blog.post.mapper;

import org.springframework.stereotype.Component;

import com.blog.post.dto.BlogOutputDTO;
import com.blog.post.model.BlogEntity;

@Component
public class BlogMapper {

    public BlogOutputDTO toBlogOutputDTO(BlogEntity blog, Boolean like) {
        return BlogOutputDTO.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .content(blog.getContent())
                .created_at(blog.getCreated_at())
                .likeCount(blog.getLike_count())
                .like(like)
                .user_id(blog.getUser().getId())
                .profileImage(blog.getUser().getProfile_image())
                .username(blog.getUser().getUsername())
                .build();
    }

}
