package com.blog.user.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.blog.user.dto.UserProfileOutputDTO;
import com.blog.user.model.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Query(nativeQuery = true, value = """
            SELECT u.id, u.username, u.email, (
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
    UserProfileOutputDTO findUserProfile(Long userProfileId, Long userId);
}
