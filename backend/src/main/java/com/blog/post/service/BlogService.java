package com.blog.post.service;

import java.sql.Timestamp;

import org.springframework.stereotype.Service;

import com.blog.post.dto.CreateDTO;
import com.blog.post.model.BlogEntity;
import com.blog.post.persistence.BlogRepository;
import com.blog.user.model.UserEntity;

@Service
public class BlogService {

    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }
    
    public String createBlog(CreateDTO blogData, UserEntity user) {
        BlogEntity blog = BlogEntity.builder()
                                    .title(blogData.title())
                                    .content(blogData.content())
                                    .created_at(new Timestamp(System.currentTimeMillis()))
                                    .user(user)
                                    .build();

        blogRepository.save(blog);
        
        return "Done";
    }

}
