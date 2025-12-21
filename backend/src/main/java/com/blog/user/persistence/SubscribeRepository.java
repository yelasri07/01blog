package com.blog.user.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog.user.model.SubscribeEntity;

@Repository
public interface SubscribeRepository extends JpaRepository<SubscribeEntity, Long> {
    Optional<SubscribeEntity> findBySubscriberIdAndSubscribedToId(Long userId, Long subscribedToId);
}
