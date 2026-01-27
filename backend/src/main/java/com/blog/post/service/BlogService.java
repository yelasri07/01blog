package com.blog.post.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blog.exception.BadRequestException;
import com.blog.exception.ForbiddenException;
import com.blog.exception.NotFoundException;
import com.blog.post.dto.AllBlogsOutputDTO;
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

    public List<AllBlogsOutputDTO> getBlogs(String filter, Long userId) {
        if (filter.equals("homeBlogs")) {
            return blogRepository.findBlogs();
        } else if (filter.equals("profileBlogs")) {
            return blogRepository.findMyBlogs(userId);
        }
        throw new BadRequestException("Filter type should be 'homeBlogs' or 'profileBlogs'");
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
        BlogEntity blog = this.getBlogById(blogId, user);

        blogRepository.delete(blog);
        return Map.of("message", "Blog deleted successfully");
    }

    public BlogEntity updateBlog(Long blogId, CreateBlogDTO blogData, UserEntity user) {
        BlogEntity blog = this.getBlogById(blogId, user);

        blog.setTitle(blogData.title());
        return blogRepository.save(blog);
    }
}
