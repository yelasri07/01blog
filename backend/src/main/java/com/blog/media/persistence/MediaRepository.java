package com.blog.media.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.media.model.MediaEntity;

public interface MediaRepository extends JpaRepository<MediaEntity, Long> {

}
