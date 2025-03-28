package com.quizlet_be.quizlet.repositories.flashset;

import com.quizlet_be.quizlet.persistent.flashset.FlashSetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;

@Repository
public interface FlashSetRepository extends JpaRepository<FlashSetEntity, UUID> {

    Set<FlashSetEntity> findByUserId(UUID userId);

    Set<FlashSetEntity> findByFolderId(UUID folderId);

    long countByFolderId(UUID folderId);
}
