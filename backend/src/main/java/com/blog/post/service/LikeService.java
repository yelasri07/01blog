package com.blog.post.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import com.blog.post.model.BlogEntity;
import com.blog.post.model.LikeEntity;
import com.blog.post.persistence.LikeRepository;
import com.blog.user.model.UserEntity;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final BlogService blogService;

    public LikeService(LikeRepository likeRepository, BlogService blogService) {
        this.likeRepository = likeRepository;
        this.blogService = blogService;
    }
    
    public String createLike(Long blogId, UserEntity user) throws Exception {
        if (blogId == null) {
            throw new BadRequestException("Whoops, blog id should not be empty");
        }

        BlogEntity blog = blogService.getBlogById(blogId, user);
        Optional<LikeEntity> existingLike = likeRepository.findByBlogIdAndUserId(blogId, user.getId());
        if (existingLike.isPresent()) {
            likeRepository.delete(existingLike.get());
            return "Like removed successfully";
        }
        
        LikeEntity like = LikeEntity.builder()
                .created_at(new Timestamp(new Date().getTime()))
                .blog(blog)
                .user(user)
                .build();

        likeRepository.save(like);
        return "Like added successfully";
    }

}
