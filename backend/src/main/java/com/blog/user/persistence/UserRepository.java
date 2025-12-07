package com.blog.user.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.user.Model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);
}
