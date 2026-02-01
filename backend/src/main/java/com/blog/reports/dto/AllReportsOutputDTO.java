package com.blog.reports.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AllReportsOutputDTO(
    Long id,
    @JsonProperty("created_at")
    Timestamp createdAt,
    @JsonProperty("reported_user_id")
    Long reportedUserId,
    @JsonProperty("reported_username")
    String reportedUsername,
    @JsonProperty("reported_by_user_id")
    Long reportedByUserId,
    @JsonProperty("reported_by_username")
    String reportedByUsername
) {
    
}
