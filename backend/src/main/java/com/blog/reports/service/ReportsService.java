package com.blog.reports.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.blog.exception.BadRequestException;
import com.blog.exception.NotFoundException;
import com.blog.reports.dto.ReportInputDTO;
import com.blog.reports.dto.AllReportsOutputDTO;
import com.blog.reports.model.ReportsEntity;
import com.blog.reports.persistence.ReportsRepository;
import com.blog.user.model.UserEntity;
import com.blog.user.persistence.UserRepository;

@Service
public class ReportsService {

    private final ReportsRepository reportsRepository;
    private final UserRepository userRepository;

    public ReportsService(ReportsRepository reportsRepository, UserRepository userRepository) {
        this.reportsRepository = reportsRepository;
        this.userRepository = userRepository;
    }

    public ReportsEntity createReport(Long reportedId, UserEntity user, ReportInputDTO reportData) {
        if (reportedId.equals(user.getId())) {
            throw new BadRequestException("Reporting yourself? That's a new level of honesty");
        }

        UserEntity reportedUser = userRepository.findById(reportedId)
                .orElseThrow(() -> new NotFoundException("Whoops, user not found"));

        ReportsEntity report = ReportsEntity.builder()
                .reason(reportData.reason())
                .created_at(new Timestamp(new Date().getTime()))
                .reportedUser(reportedUser)
                .reportedByUser(user)
                .build();

        return reportsRepository.save(report);
    }

    public List<AllReportsOutputDTO> getReports() {
        return reportsRepository.findReports();
    }

    public ReportsEntity getReport(Long reportId) {
        ReportsEntity report = reportsRepository.findById(reportId)
                .orElseThrow(() -> new NotFoundException("Report not found"));

        return report;
    }
}
