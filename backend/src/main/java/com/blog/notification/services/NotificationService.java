package com.blog.notification.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.blog.notification.persistence.NotificationRepository;
import com.blog.post.model.BlogEntity;
import com.blog.user.dto.SubscribeOutputDTO;
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
        List<SubscribeOutputDTO> followers = subscribeRepository.findFollowers(blog.getUser().getId());
        for (SubscribeOutputDTO follower : followers) {
            
        }

        // NotificationEntity notif = NotificationEntity.builder()
        //         .is_read(false)
        //         .message(blog.getUser().getUsername() + " add new blog")
        //         .target_id(blog.getId())
        //         .created_at(new Timestamp(new Date().getTime()))
        //         .build();

        // return notificationRepository.save(notif);
    }

}
