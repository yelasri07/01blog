package com.blog.post.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.post.dto.AllBlogOutputDTO;
import com.blog.post.dto.BlogOutputDTO;
import com.blog.post.dto.CreateBlogDTO;
import com.blog.post.model.BlogEntity;
import com.blog.post.service.BlogService;
import com.blog.user.model.UserEntity;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/blog")
@Slf4j
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BlogOutputDTO post(@Valid @RequestBody CreateBlogDTO blogData) {
        UserEntity user = ((UserEntity) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal());

        BlogEntity blog = blogService.createBlog(blogData, user);

        return BlogOutputDTO.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .content(blog.getContent())
                .created_at(blog.getCreated_at())
                .user_id(blog.getUser().getId())
                .username(blog.getUser().getUsername())
                .build();
    }

    @GetMapping
    public List<AllBlogOutputDTO> get() {
        return blogService.getBlogs();
    }

    @GetMapping("/{id}")
    public BlogOutputDTO getOneBlog(@PathVariable("id") Long blogId) {
        BlogEntity blog = blogService.getBlogById(blogId);

        return BlogOutputDTO.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .content(blog.getContent())
                .created_at(blog.getCreated_at())
                .user_id(blog.getUser().getId())
                .username(blog.getUser().getUsername())
                .build();
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable("id") Long blogId, @AuthenticationPrincipal UserEntity user) {
        return blogService.deleteBlog(blogId, user);
    }
}
