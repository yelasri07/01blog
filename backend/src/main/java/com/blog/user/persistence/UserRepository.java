package com.blog.user.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.blog.user.dto.UserOutputDTO;
import com.blog.user.dto.UserProfileOutputDTO;
import com.blog.user.dto.UserSearchDTO;
import com.blog.user.model.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Query(nativeQuery = true, value = """
            SELECT u.id, u.username, u.email, u.profile_image, (
                SELECT COUNT(*) FROM subscribe s
                WHERE s.subscribed_to_id = :userProfileId
            ),(
                SELECT COUNT(*) FROM subscribe s
                WHERE s.subscriber_id = :userProfileId
            ), EXISTS (
                SELECT true
                FROM subscribe s
                WHERE s.subscriber_id = :userId
                AND s.subscribed_to_id = :userProfileId
            ) FROM users u
            WHERE u.id = :userProfileId
                """)
    Optional<UserProfileOutputDTO> findUserProfile(Long userProfileId, Long userId);

    @Query(nativeQuery = true, value = """
            SELECT u.id, u.username, u.email, u.profile_image, u.role, NULL as token, u.created_at, u.is_banned
            FROM users u
            ORDER BY u.id
                """)
    List<UserOutputDTO> findAllUsers();

    @Query(nativeQuery = true, value = """
            SELECT u.id, u.username, u.profile_image FROM users u
            WHERE LOWER(u.username) like %:username%
            ORDER BY u.id DESC
            LIMIT 5
            """)
    List<UserSearchDTO> searchUsers(String username);
}
