package com.blog.reports.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.reports.dto.ReportInputDTO;
import com.blog.reports.dto.ReportOutputDTO;
import com.blog.reports.service.ReportsService;
import com.blog.user.model.UserEntity;

import jakarta.validation.Valid;

@RestController
public class ReportsController {

    private final ReportsService reportsService;

    public ReportsController(ReportsService reportsService) {
        this.reportsService = reportsService;
    }

    @PostMapping("/users/{reportedId}/reports")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Map<String, String> createReport(@PathVariable Long reportedId, @Valid @RequestBody ReportInputDTO reportData,
            @AuthenticationPrincipal UserEntity user) {
        reportsService.createReport(reportedId, user, reportData);
        return Map.of("message", "Report submitted successfully");
    }

    @GetMapping("/reports")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportOutputDTO> getReports() {
        return reportsService.getReports();
    }
}
