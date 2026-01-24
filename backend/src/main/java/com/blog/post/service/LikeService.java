package com.blog.post.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.exception.BadRequestException;
import com.blog.post.model.BlogEntity;
import com.blog.post.model.LikeEntity;
import com.blog.post.persistence.BlogRepository;
import com.blog.post.persistence.LikeRepository;
import com.blog.user.model.UserEntity;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final BlogRepository blogRepository;
    private final BlogService blogService;

    public LikeService(LikeRepository likeRepository, BlogService blogService, BlogRepository blogRepository) {
        this.likeRepository = likeRepository;
        this.blogService = blogService;
        this.blogRepository = blogRepository;
    }

    @Transactional
    public Map<String, Object> createLike(Long blogId, UserEntity user) {
        if (blogId == null) {
            throw new BadRequestException("Whoops, blog id should not be empty");
        }

        BlogEntity blog = blogService.getBlogById(blogId, user);
        Optional<LikeEntity> existingLike = likeRepository.findByBlogIdAndUserId(blogId, user.getId());
        if (existingLike.isPresent()) {
            likeRepository.delete(existingLike.get());
            blog.setLike_count(blog.getLike_count() - 1);
            blogRepository.save(blog);
            return Map.of(
                    "message", "Like removed successfully",
                    "like_count", blog.getLike_count());
        }

        LikeEntity like = LikeEntity.builder()
                .created_at(new Timestamp(new Date().getTime()))
                .blog(blog)
                .user(user)
                .build();

        likeRepository.save(like);
        blog.setLike_count(blog.getLike_count() + 1);
        blogRepository.save(blog);
        return Map.of(
                "message", "Like added successfully",
                "like_count", blog.getLike_count());
    }

}
