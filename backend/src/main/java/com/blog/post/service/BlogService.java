package com.blog.post.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blog.exception.ForbiddenException;
import com.blog.exception.NotFoundException;
import com.blog.post.dto.AllBlogsOutputDTO;
import com.blog.post.dto.CreateBlogDTO;
import com.blog.post.dto.DashboardBlogsOutputDTO;
import com.blog.post.model.BlogEntity;
import com.blog.post.persistence.BlogRepository;
import com.blog.user.model.RoleEnum;
import com.blog.user.model.UserEntity;
import com.blog.user.persistence.UserRepository;

@Service
public class BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    public BlogService(BlogRepository blogRepository, UserRepository userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }

    public BlogEntity createBlog(CreateBlogDTO blogData, UserEntity user) throws Exception {
        BlogEntity blog = BlogEntity.builder()
                .title(blogData.title())
                .content(blogData.content())
                .created_at(new Timestamp(System.currentTimeMillis()))
                .like_count(0L)
                .comment_count(0L)
                .user(user)
                .build();

        blogRepository.save(blog);
        return blog;
    }

    public List<AllBlogsOutputDTO> getBlogs(Long userId, Long lastId, Long limit) {
        if (limit <= 0 || limit > 50) {
            limit = 50l;
        }

        if (userId == null) {
            return blogRepository.findBlogs(lastId, limit);
        }

        userRepository.findById(userId).orElseThrow(() -> new NotFoundException("Whoops, user not found"));
        return blogRepository.findProfileBlogs(userId, lastId, limit);
    }

    public BlogEntity getBlogById(Long blogId, UserEntity user) {
        BlogEntity blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new NotFoundException("Whoops, blog not found"));

        if (user.getRole().equals(RoleEnum.USER) && !blog.getUser().getId().equals(user.getId())) {
            throw new ForbiddenException("Access denied");
        }

        return blog;
    }

    public Map<String, String> deleteBlog(Long blogId, UserEntity user) {
        BlogEntity blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new NotFoundException("Blog not found"));

        if (!user.getId().equals(blog.getUser().getId()) && !user.getRole().equals(RoleEnum.ADMIN)) {
            throw new ForbiddenException("Access denied");
        }

        blogRepository.delete(blog);
        return Map.of("message", "Blog deleted successfully");
    }

    public BlogEntity updateBlog(Long blogId, CreateBlogDTO blogData, UserEntity user) {
        BlogEntity blog = this.getBlogById(blogId, user);

        blog.setTitle(blogData.title());
        return blogRepository.save(blog);
    }

    public List<DashboardBlogsOutputDTO> getDashboardBlogs() {
        return blogRepository.findAllBlogs();
    }

    public Map<String, Object> changeBlogVisibility(Long blogId) {
        BlogEntity blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new NotFoundException("Blog not found"));

        if (blog.getIs_hidden() == null) {
            blog.setIs_hidden(true);
        } else {
            blog.setIs_hidden(!blog.getIs_hidden());
        }
        blogRepository.save(blog);

        String message = "The blog is visible";
        if (blog.getIs_hidden()) {
            message = "The blog is hidden";
        }

        return Map.of(
                "message", message,
                "blog_id", blog.getId(),
                "is_hidden", blog.getIs_hidden());
    }
}
