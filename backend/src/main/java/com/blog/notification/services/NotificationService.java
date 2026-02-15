package com.blog.notification.services;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blog.exception.BadRequestException;
import com.blog.exception.NotFoundException;
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

    public Map<String, String> deleteNotification(Long notifId, UserEntity user) {
        NotificationEntity notif = notificationRepository.findById(notifId)
                .orElseThrow(() -> new NotFoundException("Whoops! notification not found"));

        if (!notif.getRecipientUser().getId().equals(user.getId())) {
            throw new BadRequestException("Cannot delete other users notifications");
        }

        notificationRepository.delete(notif);

        return Map.of("message", "Notification deleted succesfully");
    }

    public Map<String, Object> updateReadStatus(Long notifId, UserEntity user) {
        NotificationEntity notification = notificationRepository.findById(notifId)
                .orElseThrow(() -> new NotFoundException("Notification not found"));

        if (!notification.getRecipientUser().getId().equals(user.getId())) {
            throw new BadRequestException("Cannot update status other users notifications");
        }

        notification.setIs_read(!notification.getIs_read());
        notificationRepository.save(notification);

        String message = "Notification is read now";
        if (!notification.getIs_read()) {
            message = "Notification is unread now";
        }

        return Map.of(
                "id", notification.getId(),
                "message", message,
                "is_read", notification.getIs_read());
    }

    public Long getUnreadNotificationsCount(UserEntity user) {
        return notificationRepository.countUnreadNotifications(user.getId());
    }

}
