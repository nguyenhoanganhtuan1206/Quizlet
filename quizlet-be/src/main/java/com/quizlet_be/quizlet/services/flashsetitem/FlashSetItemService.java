package com.quizlet_be.quizlet.services.flashsetitem;

import com.quizlet_be.quizlet.dto.flashsetItems.FlashSetItemCreationDTO;
import com.quizlet_be.quizlet.error.NotFoundException;
import com.quizlet_be.quizlet.persistent.flashset.FlashSetStore;
import com.quizlet_be.quizlet.persistent.flashsetitem.FlashSetItemStore;
import com.quizlet_be.quizlet.services.flashset.FlashSet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;
import static com.quizlet_be.quizlet.error.CommonError.supplyUnprocessableException;
import static com.quizlet_be.quizlet.services.flashsetitem.FlashSetItemError.supplyFlashSetItemNotFoundException;
import static java.time.Instant.now;

@Service
@RequiredArgsConstructor
public class FlashSetItemService {

    private final Logger logger = Logger.getLogger(FlashSetItemService.class.getName());

    private final FlashSetItemStore flashSetItemStore;

    private final FlashSetStore flashSetStore;

    /**
     * Save @{@link FlashSetItem}
     *
     * @param @{@link FlashSetItem}
     */
    public FlashSetItem save(final FlashSetItem flashSetItem) {
        return flashSetItemStore.save(flashSetItem);
    }

    /**
     * Save @{@link FlashSetItem}
     *
     * @param @{@link FlashSetItemCreationDTO}
     * @param @{@UUID flashSetId}
     * @return @{@link FlashSetItem}
     */
    public FlashSetItem createNewFlashSetItem(
            final FlashSetItemCreationDTO flashSetItemCreationDTO,
            final UUID flashSetId
    ) {
        validateFlashSetCreation(flashSetId);

        try {
            final FlashSetItem flashSetItemCreation = FlashSetItem.builder()
                    .answer(flashSetItemCreationDTO.getAnswer())
                    .question(flashSetItemCreationDTO.getQuestion())
                    .orderPosition(0)
                    .createdAt(now())
                    .build();

            return flashSetItemStore.save(flashSetItemCreation);
        } catch (Exception ex) {
            logger.log(Level.SEVERE, "Error when create FlashSet Item {createNewFlashSetItem | FlashSetItemService} " + ex.getMessage());
            throw supplyUnprocessableException("Unexpected while creating new FlashSet Item!", flashSetId).get();
        }
    }

    /**
     * Find by Id
     *
     * @param flashSetItemId
     * @throws com.quizlet_be.quizlet.error.NotFoundException return {@link <FlashSetItem>}
     */
    public FlashSetItem findById(final UUID flashSetItemId) {
        return flashSetItemStore.findById(flashSetItemId)
                .orElseThrow(supplyFlashSetItemNotFoundException("ID", flashSetItemId));
    }

    /**
     * Find by flashset Id
     *
     * @param flashSetId return {@link List<FlashSetItem>}
     */
    public List<FlashSetItem> findByFlashSetId(final UUID flashSetId) {
        return flashSetItemStore.findByFlashSetId(flashSetId);
    }

    /**
     * Find by flashset Id
     *
     * @param flashSetId return {@link List<FlashSetItem>}
     *                   throw {@link NotFoundException}
     *                   throw {@link com.quizlet_be.quizlet.error.UnprocessableException}
     */
    public void deleteByFlashSetIdAndItemId(final UUID flashSetId, final UUID flashSetItemId) {
        final List<FlashSetItem> flashSetItems = flashSetItemStore.findByFlashSetId(flashSetId);

        if (flashSetItems.size() <= 2) {
            logger.log(Level.SEVERE, "The dataSet at least 2 items {deleteByFlashSetIdAndItemId | FlashSetItemServer}");
            throw supplyUnprocessableException("Your Flash Set it must have at lease 2 items.").get();
        }

        try {
            final FlashSetItem itemDeletion = findById(flashSetItemId);

            flashSetItemStore.delete(itemDeletion);
        } catch (NotFoundException ex) {
            logger.log(Level.SEVERE, "Unexpected error {deleteByFlashSetIdAndItemId | FlashSetItemServer}: ", ex.getMessage());
            throw supplyNotFoundException(ex.getMessage()).get();
        } catch (Exception ex) {
            logger.log(Level.SEVERE, "Unexpected error {deleteByFlashSetIdAndItemId | FlashSetItemServer}: ", ex.getMessage());
            throw supplyUnprocessableException("Unexpected error while delete item").get();
        }
    }

    /**
     * Find by flashset Id
     *
     * @param flashSetId return {@link List<FlashSetItem>}
     *                   throw {@link NotFoundException}
     *                   throw {@link com.quizlet_be.quizlet.error.UnprocessableException}
     */
    private void validateFlashSetCreation(final UUID flashSetId) {
        final Optional<FlashSet> currentFlashSet = flashSetStore.findById(flashSetId);
        if (currentFlashSet.isEmpty()) {
            logger.log(Level.SEVERE, "FlashSet %s is not existed {createNewFlashSetItem | FlashSetItemService}", flashSetId);
            throw supplyNotFoundException("The Flash Set with ID is %s not found", flashSetId).get();
        }

        final List<FlashSetItem> flashSetItems = findByFlashSetId(flashSetId);

        if (flashSetItems.size() >= 100) {
            logger.log(Level.SEVERE, "The Flash Set cannot exceed 100 items {createNewFlashSetItem | FlashSetItemService}");
            throw supplyUnprocessableException("The Flash Set cannot exceed 100 items! Cannot create more.").get();
        }
    }
}
