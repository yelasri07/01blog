package com.blog.reports.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ReportInputDTO(
    @NotBlank(message = "Reason should not be empty")
    @Size(min = 5, max = 2000, message = "Reason should be between 5 and 2000 characters")
    String reason,
    @NotNull(message = "Report type should not be null" )
    String type,
    @JsonProperty("target_id")
    @NotNull(message = "Target id should not be null")
    Long targetId
) {
    public ReportInputDTO {
        reason = reason == null ? null : reason.trim();
    }
}
