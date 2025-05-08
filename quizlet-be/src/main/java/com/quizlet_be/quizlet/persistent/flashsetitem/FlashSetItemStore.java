package com.quizlet_be.quizlet.persistent.flashsetitem;

import com.quizlet_be.quizlet.mapper.flashsetitems.FlashSetItemMapper;
import com.quizlet_be.quizlet.repositories.flashsetitem.FlashSetItemRepository;
import com.quizlet_be.quizlet.services.flashsetitem.FlashSetItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.quizlet_be.quizlet.mapper.flashsetitems.FlashSetItemMapper.toFlashSetItem;
import static com.quizlet_be.quizlet.mapper.flashsetitems.FlashSetItemMapper.toFlashSetItems;
import static com.quizlet_be.quizlet.repositories.flashsetitem.FlashSetItemEntityMapper.toFlashSetItemEntities;
import static com.quizlet_be.quizlet.repositories.flashsetitem.FlashSetItemEntityMapper.toFlashSetItemEntity;

@Repository
@RequiredArgsConstructor
public class FlashSetItemStore {

    private final FlashSetItemRepository flashSetItemRepository;

    /**
     * Find by Id
     *
     * @param id return {@link Optional<FlashSetItem>}
     */
    public Optional<FlashSetItem> findById(final UUID id) {
        return flashSetItemRepository.findById(id)
                .map(FlashSetItemMapper::toFlashSetItem);
    }

    /**
     * Find by Id
     *
     * @param flashSetId return {@link List<FlashSetItem>}
     */
    public List<FlashSetItem> findByFlashSetId(final UUID flashSetId) {
        return toFlashSetItems(flashSetItemRepository.findByFlashsetId(flashSetId));
    }

    /**
     * Save all the @{@link FlashSetItem}
     *
     * @param flashSetItems return {@link List<FlashSetItem>}
     */
    public List<FlashSetItem> saveAll(final List<FlashSetItem> flashSetItems) {
        return toFlashSetItems(flashSetItemRepository.saveAll(toFlashSetItemEntities(flashSetItems)));
    }

    /**
     * Save all the @{@link FlashSetItem}
     *
     * @param flashSetItem return FlashSetItem
     */
    public FlashSetItem save(final FlashSetItem flashSetItem) {
        return toFlashSetItem(flashSetItemRepository.save(toFlashSetItemEntity(flashSetItem)));
    }

    /**
     * Delete the FlashSetItem
     *
     * @param flashSetItem
     */
    public void delete(final FlashSetItem flashSetItem) {
        flashSetItemRepository.delete(toFlashSetItemEntity(flashSetItem));
    }

    /**
     * Count by Flash Set Id
     *
     * @param flashSetId return @long
     */
    public long countByFlashSetId(final UUID flashSetId) {
        return flashSetItemRepository.countByFlashsetId(flashSetId);
    }
}
