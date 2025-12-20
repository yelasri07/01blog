package com.blog.post.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.blog.post.dto.CommentOutputDTO;
import com.blog.post.dto.CreateCommentDTO;
import com.blog.post.model.BlogEntity;
import com.blog.post.model.CommentEntity;
import com.blog.post.persistence.CommentRepository;
import com.blog.user.model.UserEntity;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final BlogService blogService;

    public CommentService(CommentRepository commentRepository, BlogService blogService) {
        this.commentRepository = commentRepository;
        this.blogService = blogService;
    }

    public CommentEntity createComment(Long blogId, CreateCommentDTO commentData, UserEntity user) {
        BlogEntity blog = blogService.getBlogById(blogId, user);

        CommentEntity comment = CommentEntity.builder()
                .content(commentData.content())
                .created_at(new Timestamp(new Date().getTime()))
                .blog(blog)
                .user(user)
                .build();

        return commentRepository.save(comment);
    }

    public List<CommentOutputDTO> getBlogComments(Long blogId, UserEntity user) {
        BlogEntity blog = blogService.getBlogById(blogId, user);
        return commentRepository.findBlogComments(blog.getId());
    }

}
