package com.blog.post.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.apache.coyote.BadRequestException;
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

    public CommentEntity createComment(CreateCommentDTO commentData, UserEntity user) throws Exception {
        if (commentData.blog_id() == null) {
            throw new BadRequestException("Blog id should not be empty");
        }

        BlogEntity blog = blogService.getBlogById(commentData.blog_id());

        CommentEntity comment = CommentEntity.builder()
                .content(commentData.content())
                .created_at(new Timestamp(new Date().getTime()))
                .blog(blog)
                .user(user)
                .build();

        return commentRepository.save(comment);
    }

    public List<CommentOutputDTO> getBlogComments(Long blogId) {
        BlogEntity blog = blogService.getBlogById(blogId);
        return commentRepository.findBlogComments(blog.getId());
    }

}
