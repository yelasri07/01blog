package com.blog.post.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.blog.post.dto.CommentOutputDTO;
import com.blog.post.model.CommentEntity;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    @Query(
        nativeQuery = true,
        value = 
        "SELECT c.*, u.username FROM blog_comments c INNER JOIN users u ON c.user_id = u.id WHERE c.blog_id = :blogId"
    )
    List<CommentOutputDTO> findBlogComments(Long blogId);
}
