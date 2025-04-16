package com.quizlet_be.quizlet.services.flashsetitem;

import com.quizlet_be.quizlet.repositories.flashsetitem.FlashSetItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.quizlet_be.quizlet.repositories.flashsetitem.FlashSetItemEntityMapper.toFlashSetItemEntities;
import static com.quizlet_be.quizlet.repositories.flashsetitem.FlashSetItemEntityMapper.toFlashSetItemEntity;
import static com.quizlet_be.quizlet.mapper.flashsetitems.FlashSetItemMapper.toFlashSetItem;
import static com.quizlet_be.quizlet.mapper.flashsetitems.FlashSetItemMapper.toFlashSetItems;

@Service
@RequiredArgsConstructor
public class FlashSetItemService {

    private final FlashSetItemRepository flashSetItemRepository;

    public List<FlashSetItem> saveAll(final List<FlashSetItem> flashSetItems) {
        return toFlashSetItems(flashSetItemRepository.saveAll(toFlashSetItemEntities(flashSetItems)));
    }

    public FlashSetItem save(final FlashSetItem flashSetItem) {
        return toFlashSetItem(flashSetItemRepository.save(toFlashSetItemEntity(flashSetItem)));
    }

    public long countByFlashsetId(final UUID flashSetId) {
        return flashSetItemRepository.countByFlashsetId(flashSetId);
    }
}
