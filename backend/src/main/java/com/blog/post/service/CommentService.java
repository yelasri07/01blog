package com.blog.post.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blog.exception.ForbiddenException;
import com.blog.exception.NotFoundException;
import com.blog.post.dto.CommentOutputDTO;
import com.blog.post.dto.CreateCommentDTO;
import com.blog.post.model.BlogEntity;
import com.blog.post.model.CommentEntity;
import com.blog.post.persistence.CommentRepository;
import com.blog.user.model.RoleEnum;
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

    public List<CommentOutputDTO> getBlogComments(Long blogId, UserEntity user, Long lastId, Long limit) {
        BlogEntity blog = blogService.getBlogById(blogId, user);
        if (limit <= 0 || limit > 50) {
            limit = 50l;
        }
        return commentRepository.findBlogComments(blog.getId(), lastId, limit);
    }

    public Map<String, Object> deleteComment(Long commentId, UserEntity user) {
        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundException("Comment not found"));

        if (!user.getId().equals(comment.getUser().getId()) && !user.getRole().equals(RoleEnum.ADMIN)) {
            throw new ForbiddenException("Access denied");
        }

        commentRepository.delete(comment);

        return Map.of(
                "id", comment.getId(),
                "message", "Comment deleted successfully");

    }

}
