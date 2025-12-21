package com.blog.user.model;

import java.sql.Timestamp;

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
@Table(name = "subscribe")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SubscribeEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Timestamp created_at;
    
    @ManyToOne
    @JoinColumn(name = "subscriber_id", referencedColumnName = "id")
    private UserEntity subscriber;
    
    @ManyToOne
    @JoinColumn(name = "subscribed_to_id", referencedColumnName = "id")
    private UserEntity subscribedTo;
}
