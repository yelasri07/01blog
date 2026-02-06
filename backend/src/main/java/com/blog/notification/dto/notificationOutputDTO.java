package com.blog.notification.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

public record notificationOutputDTO(
    Long id,
    @JsonProperty("is_read")
    Boolean isRead,
    String message,
    @JsonProperty("target_id")
    Long targetId,
    @JsonProperty("sender_username")
    String senderUsername,
    @JsonProperty("created_at")
    Timestamp createdAt
) {
    
}
