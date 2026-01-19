package com.blog.post.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blog.cloudinary.services.CloudinaryService;
import com.blog.exception.ForbiddenException;
import com.blog.exception.NotFoundException;
import com.blog.post.dto.AllBlogsOutputDTO;
import com.blog.post.dto.CreateBlogDTO;
import com.blog.post.model.BlogEntity;
import com.blog.post.persistence.BlogRepository;
import com.blog.user.model.RoleEnum;
import com.blog.user.model.UserEntity;
import com.blog.utils.MarkdownExtractor;

@Service
public class BlogService {

    private final BlogRepository blogRepository;
    private final CloudinaryService cloudinaryService;

    public BlogService(BlogRepository blogRepository, CloudinaryService cloudinaryService) {
        this.blogRepository = blogRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public BlogEntity createBlog(CreateBlogDTO blogData, UserEntity user) {
        List<String> imageTempLinks = MarkdownExtractor.extractImageLinks(blogData.content());
        List<String> imageTempNewLinks = cloudinaryService.moveTempFiles(imageTempLinks);

        System.out.println(imageTempNewLinks.toString());

        BlogEntity blog = BlogEntity.builder()
                .title(blogData.title())
                .content(blogData.content())
                .created_at(new Timestamp(System.currentTimeMillis()))
                .user(user)
                .build();

        blogRepository.save(blog);
        return blog;
    }

    public List<AllBlogsOutputDTO> getBlogs() {
        return blogRepository.findBlogs();
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
        blog.setContent(blogData.content());

        return blogRepository.save(blog);
    }
}
