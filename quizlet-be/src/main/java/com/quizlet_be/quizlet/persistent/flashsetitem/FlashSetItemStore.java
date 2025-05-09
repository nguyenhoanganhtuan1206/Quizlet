package com.quizlet_be.quizlet.persistent.flashsetitem;

import com.quizlet_be.quizlet.mapper.flashsetitems.FlashSetItemMapper;
import com.quizlet_be.quizlet.persistent.flashset.FlashSetStore;
import com.quizlet_be.quizlet.repositories.flashsetitem.FlashSetItemRepository;
import com.quizlet_be.quizlet.services.flashset.FlashSet;
import com.quizlet_be.quizlet.services.flashsetitem.FlashSetItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;
import static com.quizlet_be.quizlet.mapper.flashsetitems.FlashSetItemMapper.toFlashSetItem;
import static com.quizlet_be.quizlet.mapper.flashsetitems.FlashSetItemMapper.toFlashSetItems;
import static com.quizlet_be.quizlet.repositories.flashsetitem.FlashSetItemEntityMapper.toFlashSetItemEntities;
import static com.quizlet_be.quizlet.repositories.flashsetitem.FlashSetItemEntityMapper.toFlashSetItemEntity;
import static java.lang.String.format;

@Repository
@RequiredArgsConstructor
public class FlashSetItemStore {

    private final Logger logger = Logger.getLogger(FlashSetStore.class.getName());

    private final FlashSetItemRepository flashSetItemRepository;

    private final FlashSetStore flashSetStore;

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
     * Find by Answer and Question
     *
     * @param answer
     * @param question return {@link Optional<FlashSetItem>}
     */
    public Optional<FlashSetItem> findByAnswerAndQuestion(final String answer, final String question) {
        return flashSetItemRepository.findByAnswerAndQuestion(answer, question)
                .map(FlashSetItemMapper::toFlashSetItem);
    }

    /**
     * Find by FlashSetId and OrderPosition
     *
     * @param orderPosition
     * @param flashSetId    return {@link Optional<FlashSetItem>}
     */
    public Optional<FlashSetItem> findByOrderPositionAndFlashSetId(final long orderPosition, final UUID flashSetId) {
        return flashSetItemRepository.findByOrderPositionAndFlashSetId(orderPosition, flashSetId)
                .map(FlashSetItemMapper::toFlashSetItem);
    }

    /**
     * Find by FlashSetId
     * throw {@link com.quizlet_be.quizlet.error.NotFoundException}
     *
     * @param flashSetId return {@link List<FlashSetItem>}
     */
    public List<FlashSetItem> findByFlashSetId(final UUID flashSetId) {
        final Optional<FlashSet> flashSetItem = flashSetStore.findById(flashSetId);

        if (flashSetItem.isEmpty()) {
            logger.log(Level.SEVERE, format("Flash set with ID %s {findByFlashSetId | FlashSetItemStore} not found", flashSetId));
            throw supplyNotFoundException("The current Flash Set is not existed!").get();
        }

        return toFlashSetItems(flashSetItemRepository.findByFlashSetId(flashSetId));
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
        return flashSetItemRepository.countByFlashSetId(flashSetId);
    }
}
