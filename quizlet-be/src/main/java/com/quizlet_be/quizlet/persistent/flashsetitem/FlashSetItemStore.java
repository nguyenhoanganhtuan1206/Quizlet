package com.quizlet_be.quizlet.persistent.flashsetitem;

import com.quizlet_be.quizlet.repositories.flashsetitem.FlashSetItemRepository;
import com.quizlet_be.quizlet.services.flashsetitem.FlashSetItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static com.quizlet_be.quizlet.mapper.flashsetitems.FlashSetItemMapper.toFlashSetItem;
import static com.quizlet_be.quizlet.mapper.flashsetitems.FlashSetItemMapper.toFlashSetItems;
import static com.quizlet_be.quizlet.repositories.flashsetitem.FlashSetItemEntityMapper.toFlashSetItemEntities;
import static com.quizlet_be.quizlet.repositories.flashsetitem.FlashSetItemEntityMapper.toFlashSetItemEntity;

@Repository
@RequiredArgsConstructor
public class FlashSetItemStore {

    private final FlashSetItemRepository flashSetItemRepository;

    public List<FlashSetItem> saveAll(final List<FlashSetItem> flashSetItems) {
        return toFlashSetItems(flashSetItemRepository.saveAll(toFlashSetItemEntities(flashSetItems)));
    }

    public FlashSetItem save(final FlashSetItem flashSetItem) {
        return toFlashSetItem(flashSetItemRepository.save(toFlashSetItemEntity(flashSetItem)));
    }

    public long countByFlashSetId(final UUID flashSetId) {
        return flashSetItemRepository.countByFlashsetId(flashSetId);
    }
}
