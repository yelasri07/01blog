package com.blog.user.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.user.Model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsernameAndPassword(String username, String password);
    UserEntity findByUsername(String username);
}
