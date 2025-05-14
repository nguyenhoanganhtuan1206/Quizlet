package com.quizlet_be.quizlet.services.flashset;

import com.quizlet_be.quizlet.dto.flashsetItems.FlashSetItemCreationUpdateDTO;
import com.quizlet_be.quizlet.dto.flashsets.FlashSetCreationRequestDTO;
import com.quizlet_be.quizlet.dto.flashsets.FlashSetDetailResponseDTO;
import com.quizlet_be.quizlet.dto.flashsets.FlashSetSummaryDTO;
import com.quizlet_be.quizlet.dto.flashsets.FlashSetUpdateRequestDTO;
import com.quizlet_be.quizlet.error.NotFoundException;
import com.quizlet_be.quizlet.persistent.flashset.FlashSetStore;
import com.quizlet_be.quizlet.persistent.flashsetitem.FlashSetItemStore;
import com.quizlet_be.quizlet.persistent.folder_flashset.FolderFlashSetStore;
import com.quizlet_be.quizlet.persistent.folders.FolderStore;
import com.quizlet_be.quizlet.services.flashsetitem.FlashSetItem;
import com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSet;
import com.quizlet_be.quizlet.services.folders.Folder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import static com.quizlet_be.quizlet.error.CommonError.supplyBadRequestException;
import static com.quizlet_be.quizlet.services.flashset.FlashSetError.supplyFlashSetNotFoundException;
import static com.quizlet_be.quizlet.services.flashsetitem.FlashSetItemValidation.*;
import static java.time.Instant.now;

@Service
@RequiredArgsConstructor
public class FlashSetService {

    private final FlashSetStore flashSetStore;

    private final FolderStore folderStore;

    private final FlashSetItemStore flashSetItemStore;

    private final FolderFlashSetStore folderFlashSetStore;

    private final Logger logger = Logger.getLogger(FlashSetService.class.getName());

    public FlashSet findById(final UUID flashSetId) {
        return flashSetStore.findById(flashSetId)
                .orElseThrow(supplyFlashSetNotFoundException("ID", flashSetId));
    }

    public List<FlashSetSummaryDTO> findByUserId(final UUID userId) {
        final List<FlashSet> flashSets = flashSetStore.findByUserId(userId);

        return flashSets
                .stream()
                .map(this::mapToFlashSetSummaryDTO)
                .toList();
    }

    /**
     * Creates a new flash set.
     * Creates a new flash set items.
     *
     * @param @{@link FlashSetCreationRequestDTO} The request containing the flash set details, items, and optional folder ID.
     * @param userId  The ID of the user creating the flash set.
     * @return A DTO containing the details of the created flash set and its items.
     * @throws com.quizlet_be.quizlet.error.NotFoundException   If the specified folder does not exist.
     * @throws com.quizlet_be.quizlet.error.BadRequestException If the flash set cannot be created due to a constraint violation.
     */
    @Transactional
    public FlashSetDetailResponseDTO createFlashSet(
            final FlashSetCreationRequestDTO flashSetCreationRequest,
            final UUID userId
    ) {
        validateFlashSetItemCreation(flashSetCreationRequest, userId);
        try {
            final FlashSet flashSetCreation = flashSetStore.save(buildFlashSetByRequestAndUserId(flashSetCreationRequest, userId));

            final List<FlashSetItem> flashSetItemsBuilder = flashSetCreationRequest.getFlashSetItems()
                    .stream()
                    .map(flashSetItemCreationDTO -> buildFlashSetItemByFlashSetIdAndCreation(flashSetItemCreationDTO, flashSetCreation.getId()))
                    .toList();

            // Save all the FlashSet Item
            flashSetItemStore.saveAll(flashSetItemsBuilder);

            // Save flashset to folders
            if (!flashSetCreationRequest.getFolderIds().isEmpty()) {
                final List<Folder> folders = folderStore.findAllByIds(flashSetCreationRequest.getFolderIds());

                folders.forEach(folder -> {
                    try {
                        folderFlashSetStore.save(
                                buildFolderFlashSet(folder.getId(), flashSetCreation.getId())
                        );
                    } catch (Exception ex) {
                        logger.log(Level.WARNING,
                                String.format("Failed to associate flash set %s with folder %s: %s",
                                        flashSetCreation.getId(), folder.getId(), ex.getMessage()),
                                ex);
                        // Continue with other folders instead of failing the entire operation
                    }
                });
            }

            logger.log(Level.FINEST, String.format("Successfully created flash set %s by user %s", flashSetCreation.getId(), userId));
            return mapToFlashSetDetailResponseDTO(flashSetCreation, flashSetItemsBuilder);
        } catch (NotFoundException ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
            throw supplyBadRequestException(ex.getMessage()).get();
        } catch (Exception ex) {
            logger.log(Level.SEVERE, ex.getMessage(), ex);
            throw supplyBadRequestException("Something went wrong while creating new flash set!!! Could you please try it again!!!").get();
        }
    }

    /**
     * Creates a new flash set.
     * Creates a new flash set items.
     *
     * @param @{@link FlashSetUpdateRequestDTO} The request containing the flash set details, items, and optional folder ID.
     * @param userId  The ID of the user creating the flash set.
     * @return A DTO containing the details of the created flash set and its items.
     * @throws com.quizlet_be.quizlet.error.NotFoundException   If the specified folder does not exist.
     * @throws com.quizlet_be.quizlet.error.BadRequestException If the flash set cannot be created due to a constraint violation.
     */
    @Transactional
    public FlashSet updateFlashSet(
            final UUID userId,
            final UUID flashSetId,
            final FlashSetUpdateRequestDTO flashSetUpdateRequest
    ) {
        final FlashSet currentFlashSet = findById(flashSetId);
        validateFlashSetItemUpdate(flashSetUpdateRequest, userId, currentFlashSet);

        try {
            if (!currentFlashSet.getName().equalsIgnoreCase(flashSetUpdateRequest.getName())) {
                validateFlashSetTitle(flashSetUpdateRequest.getName());
                currentFlashSet.setName(flashSetUpdateRequest.getName());
            }

            currentFlashSet.setDescription(flashSetUpdateRequest.getDescription());
            currentFlashSet.setUpdatedAt(now());
            currentFlashSet.setDrafted(flashSetUpdateRequest.isDrafted());

            return flashSetStore.save(currentFlashSet);
        } catch (Exception exception) {
            System.out.println("Message" + exception.getMessage());
            throw supplyBadRequestException("Something went wrong while updating flash set!!! Could you please try it again").get();
        }
    }

    private FlashSet buildFlashSetByRequestAndUserId(
            final FlashSetCreationRequestDTO request,
            final UUID userId
    ) {
        return FlashSet.builder()
                .name(request.getName())
                .description(request.getDescription())
                .createdAt(now())
                .isDrafted(request.isDrafted())
                .userId(userId)
                .build();
    }

    /**
     * Build the @{@link FolderFlashSet}
     *
     * @param folderId
     * @param flashSetId return @{@link FolderFlashSet}
     */
    private FolderFlashSet buildFolderFlashSet(final UUID folderId, final UUID flashSetId) {
        return FolderFlashSet.builder()
                .folderId(folderId)
                .flashSetId(flashSetId)
                .build();
    }

    private FlashSetSummaryDTO mapToFlashSetSummaryDTO(final FlashSet flashSet) {
        final List<FlashSetItem> flashSetItems = flashSetItemStore.findByFlashSetId(flashSet.getId());

        return FlashSetSummaryDTO.builder()
                .id(flashSet.getId())
                .name(flashSet.getName())
                .description(flashSet.getDescription())
                .createdAt(flashSet.getCreatedAt())
                .updatedAt(flashSet.getUpdatedAt())
                .isDrafted(flashSet.isDrafted())
                .flashSetItems(flashSetItems)
                .build();
    }

    private FlashSetItem buildFlashSetItemByFlashSetIdAndCreation(FlashSetItemCreationUpdateDTO itemDTO, final UUID flashSetId) {
        return FlashSetItem.builder()
                .answer(itemDTO.getAnswer())
                .question(itemDTO.getQuestion())
                .createdAt(now())
                .flashsetId(flashSetId)
                .build();
    }

    private FlashSetDetailResponseDTO mapToFlashSetDetailResponseDTO(
            final FlashSet flashSet,
            final List<FlashSetItem> flashSetItems
    ) {
        return FlashSetDetailResponseDTO.builder()
                .id(flashSet.getId())
                .name(flashSet.getName())
                .description(flashSet.getDescription())
                .createdAt(flashSet.getCreatedAt())
                .updatedAt(flashSet.getUpdatedAt())
                .isDrafted(flashSet.isDrafted())
                .flashSetItems(flashSetItems)
                .build();
    }
}
