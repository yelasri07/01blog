package com.blog.notification.services;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.blog.notification.dto.notificationOutputDTO;
import com.blog.notification.model.NotificationEntity;
import com.blog.notification.persistence.NotificationRepository;
import com.blog.post.model.BlogEntity;
import com.blog.user.model.UserEntity;
import com.blog.user.persistence.SubscribeRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final SubscribeRepository subscribeRepository;

    public NotificationService(NotificationRepository notificationRepository, SubscribeRepository subscribeRepository) {
        this.notificationRepository = notificationRepository;
        this.subscribeRepository = subscribeRepository;
    }

    public void createNewBlogNotification(BlogEntity blog) {
        List<UserEntity> followers = subscribeRepository.findFollowers(blog.getUser().getId());
        for (UserEntity follower : followers) {
            NotificationEntity notif = NotificationEntity.builder()
                    .is_read(false)
                    .message("add new blog")
                    .target_id(blog.getId())
                    .created_at(new Timestamp(new Date().getTime()))
                    .recipientUser(follower)
                    .sender_username(blog.getUser().getUsername())
                    .build();

            notificationRepository.save(notif);
        }
    }

    public List<notificationOutputDTO> getNotifications(UserEntity user) {
        return notificationRepository.findNotifications(user.getId());
    }

}
