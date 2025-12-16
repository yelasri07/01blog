package com.blog.post.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog.post.dto.BlogOutputDTO;
import com.blog.post.model.BlogEntity;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, Long> {
    @Query(value = "SELECT b.*, u.username FROM blog b INNER JOIN users u ON b.user_id = u.id ORDER BY b.id DESC",
    nativeQuery = true)
    List<BlogOutputDTO> findBlogs();

    @Query(
        nativeQuery = true,
        value = 
        "SELECT b.*, u.username FROM blog b INNER JOIN users u ON b.user_id = u.id WHERE b.id = :id"
    )
    BlogOutputDTO findBlogById(@Param("id") Long blogId);
}
