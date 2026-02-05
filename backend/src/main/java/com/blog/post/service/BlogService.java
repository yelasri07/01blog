package com.blog.post.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.exception.BadRequestException;
import com.blog.exception.ForbiddenException;
import com.blog.exception.NotFoundException;
import com.blog.media.model.MediaEntity;
import com.blog.media.persistence.MediaRepository;
import com.blog.notification.services.NotificationService;
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
    private final MediaRepository mediaRepository;
    private final NotificationService notificationService;

    public BlogService(BlogRepository blogRepository, UserRepository userRepository, MediaRepository mediaRepository,
            NotificationService notificationService) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
        this.mediaRepository = mediaRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public BlogEntity createBlog(CreateBlogDTO blogData, UserEntity user) {
        this.extractAndSaveFiles(blogData.content());

        BlogEntity blog = BlogEntity.builder()
                .title(blogData.title())
                .content(blogData.content())
                .created_at(new Timestamp(System.currentTimeMillis()))
                .like_count(0L)
                .comment_count(0L)
                .user(user)
                .build();

        blogRepository.save(blog);
        notificationService.createNewBlogNotification(blog);

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

        return blog;
    }

    public Map<String, String> deleteBlog(Long blogId, UserEntity user) {
        BlogEntity blog = this.getBlogById(blogId, user);

        if (!user.getId().equals(blog.getUser().getId()) && !user.getRole().equals(RoleEnum.ADMIN)) {
            throw new ForbiddenException("Access denied");
        }

        blogRepository.delete(blog);
        return Map.of("message", "Blog deleted successfully");
    }

    @Transactional
    public BlogEntity updateBlog(Long blogId, CreateBlogDTO blogData, UserEntity user) {
        BlogEntity blog = this.getBlogById(blogId, user);

        if (!user.getId().equals(blog.getUser().getId())) {
            throw new ForbiddenException("Access denied");
        }

        this.extractAndSaveFiles(blogData.content());
        blog.setTitle(blogData.title());
        blog.setContent(blogData.content());
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

    private void extractAndSaveFiles(Map<String, Object> content) {
        List<Map<String, Object>> blocks = (List<Map<String, Object>>) content.get("blocks");
        if (blocks == null || blocks.isEmpty()) {
            throw new BadRequestException("Blog content should not be empty");
        }

        List<String> files = new ArrayList<>();
        for (Map<String, Object> block : blocks) {
            String type = (String) block.get("type");
            if (type == null) {
                throw new BadRequestException("every block should contain on a type");
            }
            if (!type.equals("image") && !type.equals("video"))
                continue;

            String url = (String) ((Map<String, Object>) (((Map<String, Object>) block.get("data")).get("file")))
                    .get("url");

            if (url == null) {
                throw new BadRequestException("File url should not be empty");
            }
            files.add(url);
        }

        for (String file : files) {
            Optional<MediaEntity> media = mediaRepository.findByUrl(file);
            if (media.isPresent()) {
                media.get().setIs_done(true);
                mediaRepository.save(media.get());
            }
        }
    }
}
