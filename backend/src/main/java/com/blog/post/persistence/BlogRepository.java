package com.blog.post.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.post.model.BlogEntity;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, Long> {
    
}
