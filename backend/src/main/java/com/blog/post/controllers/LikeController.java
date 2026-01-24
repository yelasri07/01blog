package com.blog.post.controllers;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.post.service.LikeService;
import com.blog.user.model.UserEntity;

@RestController
@RequestMapping("/blogs")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/{blogId}/likes")
    public Map<String, Object> post(@PathVariable("blogId") Long blogId, @AuthenticationPrincipal UserEntity user) {
        return likeService.createLike(blogId, user);
    }

}
