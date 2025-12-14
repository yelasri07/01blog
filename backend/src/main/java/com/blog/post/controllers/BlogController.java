package com.blog.post.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.post.dto.CreateDTO;
import com.blog.post.service.BlogService;
import com.blog.user.model.UserEntity;

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
    public String post(@RequestBody CreateDTO blogData) {
        UserEntity user = ((UserEntity) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal());

        return blogService.createBlog(blogData, user);
    }

}
