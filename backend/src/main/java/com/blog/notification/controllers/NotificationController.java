package com.blog.notification.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.notification.dto.notificationOutputDTO;
import com.blog.notification.services.NotificationService;
import com.blog.user.model.UserEntity;


@RestController
@RequestMapping("/notification")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<notificationOutputDTO> get(@AuthenticationPrincipal UserEntity user) {
        return notificationService.getNotifications(user);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable("id") Long notifId, @AuthenticationPrincipal UserEntity user) {
        return notificationService.deleteNotification(notifId, user);
    }

    @PatchMapping("/{id}")
    public Map<String, Object> update(@PathVariable("id") Long notifId, @AuthenticationPrincipal UserEntity user) {
        return notificationService.updateReadStatus(notifId, user);
    }

    @GetMapping("/unread/count")
    public Long getNotificationsCount(@AuthenticationPrincipal UserEntity user) {
        return notificationService.getUnreadNotificationsCount(user);
    }

}
