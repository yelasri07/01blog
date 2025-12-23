package com.blog.reports.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.blog.reports.dto.ReportOutputDTO;
import com.blog.reports.model.ReportsEntity;

@Repository
public interface ReportsRepository extends JpaRepository<ReportsEntity, Long> {
    @Query(
        nativeQuery = true,
        value = """
                SELECT r.id, r.created_at, u1.id, u1.username, u2.id, u2.username FROM reports r
                INNER JOIN users u1 ON r.reported_user_id = u1.id
                INNER JOIN users u2 ON r.reported_by_user_id = u2.id
                """
    )
    List<ReportOutputDTO> findReports();
}
