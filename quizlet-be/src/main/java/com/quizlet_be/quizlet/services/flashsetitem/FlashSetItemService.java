package com.quizlet_be.quizlet.services.flashsetitem;

import com.quizlet_be.quizlet.dto.flashsetItems.FlashSetItemCreationUpdateDTO;
import com.quizlet_be.quizlet.error.ConflictException;
import com.quizlet_be.quizlet.error.NotFoundException;
import com.quizlet_be.quizlet.persistent.flashset.FlashSetStore;
import com.quizlet_be.quizlet.persistent.flashsetitem.FlashSetItemStore;
import com.quizlet_be.quizlet.services.flashset.FlashSet;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import static com.quizlet_be.quizlet.error.CommonError.*;
import static com.quizlet_be.quizlet.services.flashsetitem.FlashSetItemError.supplyFlashSetItemNotFoundException;
import static java.lang.String.format;
import static java.time.Instant.now;

@Slf4j
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
     * @param @{@link com.quizlet_be.quizlet.dto.flashsetItems.FlashSetItemCreationUpdateDTO}
     * @param @{@UUID flashSetId}
     * @return @{@link FlashSetItem}
     * @throws com.quizlet_be.quizlet.error.UnprocessableException
     */
    public FlashSetItem createNewFlashSetItem(
            final FlashSetItemCreationUpdateDTO flashSetItemCreationDTO,
            final UUID flashSetId
    ) {
        final List<FlashSetItem> flashSetItems = findByFlashSetId(flashSetId);

        validateFlashItemDuplicated(flashSetId, flashSetItemCreationDTO);
        validateFlashItemDuplicatedByPosition(flashSetItemCreationDTO.getOrderPosition(), flashSetId);
        validateFlashSetItemSize(flashSetItems);
        validateFlashSetExisted(flashSetId);

        try {
            final int orderPosition = flashSetItemCreationDTO.getOrderPosition() != 0
                    ? flashSetItemCreationDTO.getOrderPosition()
                    : flashSetItems.size() + 1;
            final FlashSetItem flashSetItemCreation = FlashSetItem.builder()
                    .answer(flashSetItemCreationDTO.getAnswer())
                    .question(flashSetItemCreationDTO.getQuestion())
                    .orderPosition(orderPosition)
                    .createdAt(now())
                    .flashsetId(flashSetId)
                    .build();

            return flashSetItemStore.save(flashSetItemCreation);
        } catch (Exception ex) {
            logger.log(Level.SEVERE, "Error when create FlashSet Item {createNewFlashSetItem | FlashSetItemService} " + ex.getMessage());
            throw supplyUnprocessableException("Unexpected while creating new FlashSet Item!", flashSetId).get();
        }
    }

    /**
     * Update @{@link FlashSetItem}
     *
     * @param @{@link UUID flashSetItemId}
     * @param @{@link FlashSetItemCreationUpdateDTO}
     * @param @{@UUID flashSetId}
     * @return @{@link FlashSetItem}
     * @throws com.quizlet_be.quizlet.error.UnprocessableException
     */
    public FlashSetItem updateFlashSetItem(
            final UUID flashSetItemId,
            final FlashSetItemCreationUpdateDTO flashSetItemUpdateDTO,
            final UUID flashSetId
    ) {
        final FlashSetItem currentFlashSetItem = findByIdAndFlashSetId(flashSetItemId, flashSetId);

        validateFlashSetExisted(flashSetId);
        validateFlashItemDuplicatedByPosition(flashSetItemUpdateDTO.getOrderPosition(), flashSetId);

        try {
            if (!flashSetItemUpdateDTO.getAnswer().equalsIgnoreCase(currentFlashSetItem.getAnswer()) ||
                    !flashSetItemUpdateDTO.getQuestion().equalsIgnoreCase(currentFlashSetItem.getQuestion())) {
                validateFlashItemDuplicated(flashSetId, flashSetItemUpdateDTO);

                currentFlashSetItem.setAnswer(flashSetItemUpdateDTO.getAnswer());
                currentFlashSetItem.setQuestion(flashSetItemUpdateDTO.getQuestion());
                currentFlashSetItem.setUpdatedAt(now());
            }

            return flashSetItemStore.save(currentFlashSetItem);
        } catch (ConflictException ex) {
            logger.log(Level.SEVERE, format("FlashSetItem with ID %s already existed {updateFlashSetItem | FlashSetItemService}", flashSetItemId));
            throw supplyConflictException(ex.getMessage()).get();
        } catch (Exception ex) {
            logger.log(Level.SEVERE, "Error while update the flash set item {updateFlashSetItem | FlashSetItemService}", ex.getMessage());
            throw supplyUnprocessableException("Unexpected error while update your flash set item. Please try it again").get();
        }
    }

    /**
     * Find by Id
     *
     * @param id
     * @throws com.quizlet_be.quizlet.error.NotFoundException return {@link <FlashSetItem>}
     */
    public FlashSetItem findById(final UUID id) {
        logger.log(Level.SEVERE, format("Flash Set Item with ID %s is not existed!", id));
        return flashSetItemStore.findById(id)
                .orElseThrow(supplyFlashSetItemNotFoundException("ID", id));
    }

    /**
     * Find by Id
     *
     * @param flashSetId
     * @throws com.quizlet_be.quizlet.error.NotFoundException return {@link <FlashSetItem>}
     * @oaram id
     */
    public FlashSetItem findByIdAndFlashSetId(final UUID id, final UUID flashSetId) {
        logger.log(Level.SEVERE, format("Flash Set Item with ID %s and Flash Set ID is %s is not existed!", id, flashSetId));
        return flashSetItemStore.findByIdAndFlashSetId(id, flashSetId)
                .orElseThrow(supplyNotFoundException("The current Flash Set Item is not existed."));
    }

    /**
     * Find by FlashSet Id
     *
     * @param flashSetId return {@link List<FlashSetItem>}
     */
    public List<FlashSetItem> findByFlashSetId(final UUID flashSetId) {
        return flashSetItemStore.findByFlashSetId(flashSetId);
    }

    /**
     * Find by FlashSet Id
     *
     * @param flashSetId return {@link List<FlashSetItem>}
     *                   throw {@link NotFoundException}
     *                   throw {@link com.quizlet_be.quizlet.error.UnprocessableException}
     */
    public void deleteByFlashSetIdAndItemId(final UUID flashSetId, final UUID flashSetItemId) {
        final List<FlashSetItem> flashSetItems = flashSetItemStore.findByFlashSetId(flashSetId);

        if (flashSetItems.size() <= 2) {
            logger.log(Level.SEVERE, "The dataSet at least 2 items {deleteByFlashSetIdAndItemId | FlashSetItemServer}");
            throw supplyUnprocessableException("Cannot delete your Flash Set it must be at lease 2 items").get();
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
     * To validate whether @{@link FlashSetItem} is duplicated or not by Answer and Question
     *
     * @param flashSetId
     * @param flashSetItemCreationUpdateDTO throw {@link com.quizlet_be.quizlet.error.ConflictException}
     */
    private void validateFlashItemDuplicated(
            final UUID flashSetId,
            final FlashSetItemCreationUpdateDTO flashSetItemCreationUpdateDTO
    ) {
        final Optional<FlashSetItem> flashSetItem = flashSetItemStore.findByAnswerAndQuestionAndFlashSetId(
                flashSetItemCreationUpdateDTO.getAnswer(),
                flashSetItemCreationUpdateDTO.getQuestion(),
                flashSetId
        );

        if (flashSetItem.isPresent()) {
            logger.log(Level.SEVERE, format("FlashSetItem with ID %s already existed {validateFlashItemDuplicated | FlashSetItemService}", flashSetItem.get().getId()));
            throw supplyConflictException("The Flash Set Item is already existed. Please look at another item").get();
        }
    }

    /**
     * To validate whether @{@link FlashSetItem} is duplicated or not by Answer and Question
     *
     * @param orderPosition
     * @param flashSetId    throw {@link com.quizlet_be.quizlet.error.ConflictException}
     */
    private void validateFlashItemDuplicatedByPosition(final long orderPosition, final UUID flashSetId) {
        final Optional<FlashSetItem> flashSetItem = flashSetItemStore.findByOrderPositionAndFlashSetId(orderPosition, flashSetId);
        if (flashSetItem.isPresent()) {
            logger.log(Level.SEVERE, format("The position of FlashSetItem with ID %s is taken {validateFlashItemDuplicatedByPosition | FlashSetItemService}", flashSetItem.get().getId()));
            throw supplyConflictException("Unexpected update your flash set item. Could you please try it again").get();
        }
    }

    /**
     * To validate the @{@link FlashSetItem} already existed by ID
     *
     * @param flashSetId throw {@link NotFoundException}
     */
    private void validateFlashSetExisted(final UUID flashSetId) {
        final Optional<FlashSet> currentFlashSet = flashSetStore.findById(flashSetId);

        if (currentFlashSet.isEmpty()) {
            logger.log(Level.SEVERE, format("FlashSet with ID %s is not existed {validateFlashSetExisted | FlashSetItemService}", flashSetId));
            throw supplyNotFoundException("The Flash Set with ID is %s not found", flashSetId).get();
        }
    }

    /**
     * To validate size of the {@link FlashSetItem}
     *
     * @param flashSetItems throw {@link com.quizlet_be.quizlet.error.UnprocessableException}
     */
    private void validateFlashSetItemSize(final List<FlashSetItem> flashSetItems) {
        if (flashSetItems.size() >= 100) {
            logger.log(Level.SEVERE, "The Flash Set cannot exceed 100 items {validateFlashSetItemSize | FlashSetItemService}");
            throw supplyUnprocessableException("The Flash Set cannot exceed 100 items! Cannot create more.").get();
        }
    }
}
