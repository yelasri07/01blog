package com.blog.reports.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.blog.exception.BadRequestException;
import com.blog.exception.NotFoundException;
import com.blog.post.persistence.BlogRepository;
import com.blog.reports.dto.ReportInputDTO;
import com.blog.reports.model.ReportsEntity;
import com.blog.reports.persistence.ReportsRepository;
import com.blog.user.model.UserEntity;
import com.blog.user.persistence.UserRepository;

@Service
public class ReportsService {

    private final ReportsRepository reportsRepository;
    private final UserRepository userRepository;
    private final BlogRepository blogRepository;

    public ReportsService(ReportsRepository reportsRepository, UserRepository userRepository,
            BlogRepository blogRepository) {
        this.reportsRepository = reportsRepository;
        this.userRepository = userRepository;
        this.blogRepository = blogRepository;
    }

    public ReportsEntity createReport(UserEntity user, ReportInputDTO reportData) {
        if (reportData.type().equals("USER") && reportData.targetId().equals(user.getId())) {
            throw new BadRequestException("Reporting yourself? That's a new level of honesty");
        }

        switch (reportData.type()) {
            case "USER" -> userRepository.findById(reportData.targetId())
                    .orElseThrow(() -> new NotFoundException("Whoops, user not found"));
            case "BLOG" -> blogRepository.findById(reportData.targetId())
                    .orElseThrow(() -> new NotFoundException("Whoops! blog not found"));
            default -> throw new BadRequestException("Report type should be 'USER' or 'BLOG'");
        }

        Boolean showMore = false;
        if (reportData.reason().length() > 7) {
            showMore = true;
        }

        ReportsEntity report = ReportsEntity.builder()
                .reason(reportData.reason())
                .created_at(new Timestamp(new Date().getTime()))
                .reporter_id(user.getId())
                .target_id(reportData.targetId())
                .type(reportData.type())
                .show_more(showMore)
                .status("PENDING")
                .build();

        return reportsRepository.save(report);
    }

    public List<ReportsEntity> getReports() {
        return reportsRepository.findAll();
    }

}
