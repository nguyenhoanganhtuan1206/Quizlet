package com.quizlet_be.quizlet.repositories.flashset;

import com.quizlet_be.quizlet.persistent.flashset.FlashSetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FlashSetRepository extends JpaRepository<FlashSetEntity, UUID> {

    List<FlashSetEntity> findByUserId(UUID userId);

    long countByFolderId(UUID folderId);
}
