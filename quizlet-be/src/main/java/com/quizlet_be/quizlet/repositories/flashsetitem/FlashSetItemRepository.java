package com.quizlet_be.quizlet.repositories.flashsetitem;

import com.quizlet_be.quizlet.persistent.flashsetitem.FlashSetItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FlashSetItemRepository extends JpaRepository<FlashSetItemEntity, UUID> {
}
