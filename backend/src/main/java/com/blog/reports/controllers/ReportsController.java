package com.blog.reports.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.reports.dto.ReportInputDTO;
import com.blog.reports.model.ReportsEntity;
import com.blog.reports.service.ReportsService;
import com.blog.user.model.UserEntity;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/reports")
public class ReportsController {

    private final ReportsService reportsService;

    public ReportsController(ReportsService reportsService) {
        this.reportsService = reportsService;
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Map<String, String> createReport(@Valid @RequestBody ReportInputDTO reportData,
            @AuthenticationPrincipal UserEntity user) {
        reportsService.createReport(user, reportData);
        return Map.of("message", "Report submitted successfully");
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportsEntity> getReports() {
        return reportsService.getReports();
    }

    @PatchMapping("/{reportId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> update(@PathVariable Long reportId, @RequestBody Map<String, String> reportData) {
        return reportsService.changeReportStatus(reportId, reportData);
    }

    @DeleteMapping("/{reportId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, String> delete(@PathVariable Long reportId) {
        return this.reportsService.deleteReport(reportId);
    }

}
