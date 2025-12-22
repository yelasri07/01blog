package com.blog.user.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.blog.user.dto.SubscribeOutputDTO;
import com.blog.user.model.SubscribeEntity;

@Repository
public interface SubscribeRepository extends JpaRepository<SubscribeEntity, Long> {
    Optional<SubscribeEntity> findBySubscriberIdAndSubscribedToId(Long userId, Long subscribedToId);

    @Query(
        nativeQuery = true,
        value = 
        """
            SELECT u.id, u.username FROM subscribe s
            INNER JOIN users u ON s.subscriber_id = u.id
            WHERE s.subscribed_to_id = :profileId
                """
    )
    List<SubscribeOutputDTO> findFollowers(Long profileId);
}
