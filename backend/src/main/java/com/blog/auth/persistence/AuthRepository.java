package com.blog.auth.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.auth.model.AuthEntity;

@Repository
public interface AuthRepository extends JpaRepository<AuthEntity, Long> {

}