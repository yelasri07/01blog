package com.blog.post.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.exception.NotFoundException;
import com.blog.post.dto.AllBlogsOutputDTO;
import com.blog.post.dto.BlogOutputDTO;
import com.blog.post.dto.CreateBlogDTO;
import com.blog.post.mapper.BlogMapper;
import com.blog.post.model.BlogEntity;
import com.blog.post.service.BlogService;
import com.blog.post.service.LikeService;
import com.blog.user.model.UserEntity;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/blogs")
@Slf4j
public class BlogController {

    private final BlogService blogService;
    private final LikeService likeService;
    private final BlogMapper blogMapper;

    public BlogController(BlogService blogService, BlogMapper blogMapper, LikeService likeService) {
        this.blogService = blogService;
        this.blogMapper = blogMapper;
        this.likeService = likeService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BlogOutputDTO post(@Valid @RequestBody CreateBlogDTO blogData, @AuthenticationPrincipal UserEntity user) {
        try {
            BlogEntity blog = blogService.createBlog(blogData, user);
            return blogMapper.toBlogOutputDTO(blog, false);
        } catch (Exception e) {
            throw new NotFoundException(e.getMessage());
        }
    }

    @GetMapping
    public List<AllBlogsOutputDTO> get() {
        return blogService.getBlogs(null);
    }

    @GetMapping("/profile/{userId}")
    public List<AllBlogsOutputDTO> getProfileBlogs(@PathVariable Long userId) {
        return blogService.getBlogs(userId);
    }

    @GetMapping("/{id}")
    public BlogOutputDTO getOneBlog(@PathVariable("id") Long blogId, @AuthenticationPrincipal UserEntity user) {
        BlogEntity blog = blogService.getBlogById(blogId, user);
        Boolean like = likeService.isLikedBlog(blog, user.getId());
        return blogMapper.toBlogOutputDTO(blog, like);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable("id") Long blogId, @AuthenticationPrincipal UserEntity user) {
        return blogService.deleteBlog(blogId, user);
    }

    @PutMapping("/{id}")
    public BlogOutputDTO update(@PathVariable("id") Long blogId, @RequestBody CreateBlogDTO blogData,
            @AuthenticationPrincipal UserEntity user) {
        BlogEntity blog = blogService.updateBlog(blogId, blogData, user);
        return blogMapper.toBlogOutputDTO(blog, false);
    }
}
