package com.blog.post.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.post.dto.CommentOutputDTO;
import com.blog.post.dto.CreateCommentDTO;
import com.blog.post.model.CommentEntity;
import com.blog.post.service.CommentService;
import com.blog.user.model.UserEntity;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/blog")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/comment")
    @ResponseStatus(code = HttpStatus.CREATED)
    public CommentOutputDTO post(@Valid @RequestBody CreateCommentDTO commentData,
            @AuthenticationPrincipal UserEntity user) throws Exception {
        CommentEntity comment = commentService.createComment(commentData, user);

        return CommentOutputDTO.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .created_at(comment.getCreated_at())
                .blog_id(comment.getBlog().getId())
                .user_id(comment.getUser().getId())
                .username(comment.getUser().getUsername())
                .build();
    }

    @GetMapping("/{blogId}/comment")
    public List<CommentOutputDTO> get(@PathVariable("blogId") Long blogId) {
        return commentService.getBlogComments(blogId);
    }
}
