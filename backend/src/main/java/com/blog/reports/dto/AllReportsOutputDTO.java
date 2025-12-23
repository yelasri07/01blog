package com.blog.reports.dto;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AllReportsOutputDTO(
    Long id,
    @JsonProperty("created_at")
    Timestamp createdAt,
    Long reportedUserId,
    String reportedUsername,
    Long reportedByUserId,
    String reportedByUsername
) {
    
}
