package com.quizlet_be.quizlet.repositories.flashset;

import com.quizlet_be.quizlet.persistent.flashset.FlashSetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FlashSetRepository extends JpaRepository<FlashSetEntity, UUID> {

    List<FlashSetEntity> findByUserId(UUID userId);

    @Query(value = "SELECT f FROM flashsets WHERE f.user_id = :userId AND f.id != :flashSetId ORDER BY f.created_at")
    List<FlashSetEntity> findByUserIdAndNotFLashSetId(@Param("userId") UUID userId, @Param("flashSetId") UUID flashSetId);
}
