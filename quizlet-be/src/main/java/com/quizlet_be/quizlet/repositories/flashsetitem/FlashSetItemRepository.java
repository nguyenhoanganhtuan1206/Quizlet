package com.quizlet_be.quizlet.repositories.flashsetitem;

import com.quizlet_be.quizlet.persistent.flashsetitem.FlashSetItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FlashSetItemRepository extends JpaRepository<FlashSetItemEntity, UUID> {

    Optional<FlashSetItemEntity> findByAnswerAndQuestionAndFlashSetId(final String answer, final String question, final UUID flashSetId);

    Optional<FlashSetItemEntity> findByOrderPositionAndFlashSetId(final long orderPosition, final UUID flashSetId);

    Optional<FlashSetItemEntity> findByIdAndFlashSetId(final UUID id, final UUID flashSetId);

    long countByFlashSetId(final UUID flashSetId);

    List<FlashSetItemEntity> findByFlashSetId(final UUID flashSetId);
}
