package com.blog.reports.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record ReportOutputDTO(
    Long id,
    String reason,
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
