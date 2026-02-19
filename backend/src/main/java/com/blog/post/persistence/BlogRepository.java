package com.blog.post.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.blog.post.dto.AllBlogsOutputDTO;
import com.blog.post.dto.DashboardBlogsOutputDTO;
import com.blog.post.model.BlogEntity;
import com.blog.post.model.BlogSearchDTO;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, Long> {
        @Query(value = """
                        SELECT b.id, b.title, b.created_at, b.user_id, u.username, u.profile_image, b.like_count,
                        EXISTS (
                                SELECT true FROM blog_likes bl
                                WHERE bl.user_id = :userId AND bl.blog_id = b.id
                        )
                        FROM blog b
                        INNER JOIN users u ON b.user_id = u.id
                        WHERE b.id < :lastId OR :lastId <= 0
                        ORDER BY b.id DESC
                        LIMIT :limit
                        """, nativeQuery = true)
        List<AllBlogsOutputDTO> findBlogs(Long lastId, Long limit, Long userId);

        @Query(value = """
                        SELECT b.id, b.title, b.created_at, b.user_id, u.username, u.profile_image, b.like_count,
                        EXISTS (
                                SELECT true FROM blog_likes bl
                                WHERE bl.user_id = :userId AND bl.blog_id = b.id
                        )
                        FROM blog b
                        INNER JOIN users u ON b.user_id = u.id
                        WHERE u.id = :profileUserId AND (b.id < :lastId OR :lastId <= 0)
                        ORDER BY b.id DESC
                        LIMIT :limit
                        """, nativeQuery = true)
        List<AllBlogsOutputDTO> findProfileBlogs(Long profileUserId, Long lastId, Long limit, Long userId);

        @Query(nativeQuery = true, value = """
                        SELECT b.id, b.title, b.created_at, b.is_hidden
                        FROM blog b
                        ORDER BY b.id
                                """)
        List<DashboardBlogsOutputDTO> findAllBlogs();

        @Query(nativeQuery = true, value = """
                        SELECT b.id, b.title FROM blog b
                        WHERE LOWER(b.title) like %:title%
                        ORDER BY b.id DESC
                        LIMIT 5
                        """)
        List<BlogSearchDTO> searchBlogs(String title);
}
