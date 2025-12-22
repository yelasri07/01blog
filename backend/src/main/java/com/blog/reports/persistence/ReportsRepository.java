package com.blog.reports.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.reports.model.ReportsEntity;

@Repository
public interface ReportsRepository extends JpaRepository<ReportsEntity, Long> {
    
}
