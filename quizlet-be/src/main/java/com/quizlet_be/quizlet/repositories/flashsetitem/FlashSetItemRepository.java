package com.quizlet_be.quizlet.repositories.flashsetitem;

import com.quizlet_be.quizlet.persistent.flashsetitem.FlashSetItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FlashSetItemRepository extends JpaRepository<FlashSetItemEntity, UUID> {

    long countByFlashsetId(final UUID flashSetId);

    List<FlashSetItemEntity> findByFlashsetId(final UUID flashSetId);
}
