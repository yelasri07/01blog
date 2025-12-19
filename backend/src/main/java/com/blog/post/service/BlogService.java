package com.blog.post.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.blog.exception.ForbiddenException;
import com.blog.exception.NotFoundException;
import com.blog.post.dto.AllBlogOutputDTO;
import com.blog.post.dto.CreateBlogDTO;
import com.blog.post.model.BlogEntity;
import com.blog.post.persistence.BlogRepository;
import com.blog.user.model.RoleEnum;
import com.blog.user.model.UserEntity;

@Service
public class BlogService {

    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public BlogEntity createBlog(CreateBlogDTO blogData, UserEntity user) {
        BlogEntity blog = BlogEntity.builder()
                .title(blogData.title())
                .content(blogData.content())
                .created_at(new Timestamp(System.currentTimeMillis()))
                .user(user)
                .build();

        blogRepository.save(blog);
        return blog;
    }

    public List<AllBlogOutputDTO> getBlogs() {
        return blogRepository.findBlogs();
    }

    public BlogEntity getBlogById(Long blogId) {
        BlogEntity blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new NotFoundException("Whoops, blog not found"));

        return blog;
    }

    public Map<String, String> deleteBlog(Long blogId, UserEntity user) {
        Optional<BlogEntity> existingBlog = blogRepository.findById(blogId);
        if (!existingBlog.isPresent()) {
            throw new NotFoundException("Whoops, blog not found");
        }

        BlogEntity blog = existingBlog.get();
        if (!blog.getUser().getId().equals(user.getId()) && user.getRole().equals(RoleEnum.USER)) {
            throw new ForbiddenException("Access denied");
        }

        blogRepository.delete(blog);
        return Map.of("message", "Blog deleted successfully");
    }
}
