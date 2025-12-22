package com.blog.reports.model;

import java.sql.Timestamp;

import com.blog.user.model.UserEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Table(name = "reports")
public class ReportsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String reason;
    private Timestamp created_at;

    @ManyToOne
    @JoinColumn(name = "reported_user_id", referencedColumnName = "id")
    private UserEntity reportedUser;

    @ManyToOne
    @JoinColumn(name = "reported_by_user_id", referencedColumnName = "id")
    private UserEntity reportedByUser;
}
