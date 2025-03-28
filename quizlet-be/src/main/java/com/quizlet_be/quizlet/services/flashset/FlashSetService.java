package com.quizlet_be.quizlet.services.flashset;

import com.quizlet_be.quizlet.dto.flashsets.FlashSetSummaryDTO;
import com.quizlet_be.quizlet.persistent.flashset.FlashSetStore;
import com.quizlet_be.quizlet.services.flashsetitem.FlashSetItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FlashSetService {

    private final FlashSetStore flashSetStore;

    private final FlashSetItemService flashSetItemService;

    public List<FlashSetSummaryDTO> findByUserId(final UUID userId) {
        final List<FlashSet> flashSets = flashSetStore.findByUserId(userId);

        return flashSets
                .stream()
                .map(this::mapToFlashSetSummaryDTO)
                .toList();
    }

    public List<FlashSet> findFolderId(final UUID folderId) {
        return flashSetStore.findByFolderId(folderId);
    }

    public long countByFolderId(final UUID folderId) {
        return flashSetStore.countByFolderId(folderId);
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
                .folderId(flashSet.getFolderId())
                .userId(flashSet.getUserId())
                .flashSetItemCount(flashSetItemCount)
                .build();
    }
}
