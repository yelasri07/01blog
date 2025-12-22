package com.blog.reports.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ReportInputDTO(
    @NotBlank(message = "Reason should not be empty")
    @Size(min = 15, max = 2000, message = "Reason should be between 15 and 2000 characters")
    String reason
) {
    public ReportInputDTO {
        reason = reason == null ? null : reason.trim();
    }
}
