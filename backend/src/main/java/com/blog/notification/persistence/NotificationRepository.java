package com.blog.notification.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.blog.notification.dto.notificationOutputDTO;
import com.blog.notification.model.NotificationEntity;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {

    @Query(nativeQuery = true, value = """
            SELECT n.id, n.is_read, n.message, n.target_id, n.sender_username, n.created_at
            FROM notification n
            WHERE n.recipient_id = :userId
            ORDER BY n.id DESC
            """)
    List<notificationOutputDTO> findNotifications(Long userId);

    @Query(nativeQuery = true, value = """
            SELECT COUNT(n.id) FROM notification n
            WHERE n.recipient_id = :userId AND is_read = false
            """)
    Long countUnreadNotifications(Long userId);

}
