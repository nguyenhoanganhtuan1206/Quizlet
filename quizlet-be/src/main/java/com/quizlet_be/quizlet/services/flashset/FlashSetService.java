package com.quizlet_be.quizlet.services.flashset;

import com.quizlet_be.quizlet.dto.flashsetItems.FlashSetItemCreationDTO;
import com.quizlet_be.quizlet.dto.flashsets.FlashSetCreationRequestDTO;
import com.quizlet_be.quizlet.dto.flashsets.FlashSetDetailResponseDTO;
import com.quizlet_be.quizlet.dto.flashsets.FlashSetSummaryDTO;
import com.quizlet_be.quizlet.persistent.flashset.FlashSetStore;
import com.quizlet_be.quizlet.services.flashsetitem.FlashSetItem;
import com.quizlet_be.quizlet.services.flashsetitem.FlashSetItemService;
import com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSet;
import com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSetService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.quizlet_be.quizlet.services.flashset.FlashSetValidation.supplyFlashSetNotFound;
import static com.quizlet_be.quizlet.services.flashsetitem.FlashSetItemValidation.validateFlashSetItemCreation;
import static com.quizlet_be.quizlet.services.flashsetitem.FlashSetItemValidation.validateFlashSetTitle;
import static java.time.Instant.now;

@Service
@RequiredArgsConstructor
public class FlashSetService {

    private final FlashSetStore flashSetStore;

    private final FlashSetItemService flashSetItemService;

    private final FolderFlashSetService folderFlashSetService;

    public FlashSet findById(final UUID flashSetId) {
        return flashSetStore.findById(flashSetId)
                .orElseThrow(supplyFlashSetNotFound("ID", flashSetId));
    }

    public List<FlashSet> findByFolderId(final UUID folderId) {
        final List<FolderFlashSet> folderFlashSets = folderFlashSetService.findByFolderId(folderId);

        return folderFlashSets
                .stream()
                .map(folderFlashSet -> findById(folderFlashSet.getFlashSetId()))
                .toList();
    }

    public List<FlashSetSummaryDTO> findByUserId(final UUID userId) {
        final List<FlashSet> flashSets = flashSetStore.findByUserId(userId);

        return flashSets
                .stream()
                .map(this::mapToFlashSetSummaryDTO)
                .toList();
    }

    public long countByFolderId(final UUID folderId) {
        return flashSetStore.countByFolderId(folderId);
    }

    @Transactional
    public FlashSetDetailResponseDTO createFlashSet(
            final FlashSetCreationRequestDTO flashSetCreationRequest,
            final UUID userId
    ) {
        validateFlashSetItemCreation(flashSetCreationRequest, userId);

        final FlashSet flashSetCreation = buildAndSaveFlashSet(flashSetCreationRequest, userId);
        final List<FlashSetItem> flashSetItems = flashSetCreationRequest.getFlashSetItems()
                .stream()
                .map(flashSetItemCreationDTO -> mapToFlashSetItem(flashSetItemCreationDTO, flashSetCreation.getId()))
                .toList();

        flashSetItemService.saveAll(flashSetItems);
        folderFlashSetService.save(mapFolderFlashSet(flashSetCreation.getId(), flashSetCreation.getId()));

        return mapToFlashSEtDetailResponseDTO(flashSetCreation, flashSetItems);
    }

    @Transactional
    public FlashSetDetailResponseDTO updateFlashSet(
            final UUID flashSetId,
            final FlashSetCreationRequestDTO flashSetUpdateRequest
    ) {
        final FlashSet currentFlashSet = findById(flashSetId);

        if (!currentFlashSet.getName().equalsIgnoreCase(flashSetUpdateRequest.getName())) {
            validateFlashSetTitle(flashSetUpdateRequest.getName());
        }

        currentFlashSet.setDescription(flashSetUpdateRequest.getDescription());
//        currentFlashSet.setUpdatedAt(flashSetUpdateRequest.getDescription());
        currentFlashSet.setUpdatedAt(now());

        return null;
    }

    private FlashSet buildAndSaveFlashSet(
            final FlashSetCreationRequestDTO request,
            final UUID userId
    ) {
        final FlashSet flashSet = FlashSet.builder()
                .name(request.getName())
                .description(request.getDescription())
                .createdAt(now())
                .isDrafted(request.isDrafted())
                .userId(userId)
                .build();
        return flashSetStore.save(flashSet);
    }

    private FolderFlashSet mapFolderFlashSet(final UUID folderId, final UUID flashSetId) {
        return FolderFlashSet.builder()
                .folderId(folderId)
                .flashSetId(flashSetId)
                .build();
    }

    private FlashSetSummaryDTO mapToFlashSetSummaryDTO(final FlashSet flashSet) {
        final long flashSetItemCount = flashSetItemService.countByFlashsetId(flashSet.getId());

        return FlashSetSummaryDTO.builder()
                .id(flashSet.getId())
                .name(flashSet.getName())
                .description(flashSet.getDescription())
                .createdAt(flashSet.getCreatedAt())
                .updatedAt(flashSet.getUpdatedAt())
                .isDrafted(flashSet.isDrafted())
                .flashSetItemCount(flashSetItemCount)
                .build();
    }

    private FlashSetItem mapToFlashSetItem(FlashSetItemCreationDTO itemDTO, UUID flashSetId) {
        FlashSetItem flashSetItem = FlashSetItem.builder()
                .answer(itemDTO.getAnswer())
                .question(itemDTO.getQuestion())
                .createdAt(now())
                .flashsetId(flashSetId)
                .build();
        return flashSetItemService.save(flashSetItem);
    }

    private FlashSetDetailResponseDTO mapToFlashSEtDetailResponseDTO(
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
