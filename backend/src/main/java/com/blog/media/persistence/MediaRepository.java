package com.blog.media.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.media.model.MediaEntity;

public interface MediaRepository extends JpaRepository<MediaEntity, Long> {
    Optional<MediaEntity> findByPublicId(String publicId);
}
