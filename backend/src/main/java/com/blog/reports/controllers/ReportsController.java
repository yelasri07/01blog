package com.blog.reports.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.reports.dto.ReportInputDTO;
import com.blog.reports.service.ReportsService;
import com.blog.user.model.UserEntity;

import jakarta.validation.Valid;

@RestController
public class ReportsController {

    private final ReportsService reportsService;

    public ReportsController(ReportsService reportsService) {
        this.reportsService = reportsService;
    }

    @PostMapping("/reports")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Map<String, String> createReport(@Valid @RequestBody ReportInputDTO reportData,
            @AuthenticationPrincipal UserEntity user) {
        reportsService.createReport(user, reportData);
        return Map.of("message", "Report submitted successfully");
    }

    // @GetMapping("/reports")
    // @PreAuthorize("hasRole('ADMIN')")
    // public List<AllReportsOutputDTO> getReports() {
    // return reportsService.getReports();
    // }

    // @GetMapping("/reports/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    // public ReportOutputDTO getReport(@PathVariable("id") Long reportId) {
    // ReportsEntity report = reportsService.getReport(reportId);

    // return ReportOutputDTO.builder()
    // .id(report.getId())
    // .reason(report.getReason())
    // .createdAt(report.getCreated_at())
    // .reportedUserId(report.getReportedUser().getId())
    // .reportedUsername(report.getReportedUser().getUsername())
    // .reportedByUserId(report.getReportedByUser().getId())
    // .reportedByUsername(report.getReportedByUser().getUsername())
    // .build();
    // }
}
