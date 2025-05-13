package com.quizlet_be.quizlet.api.flashset_item;

import com.quizlet_be.quizlet.dto.flashsetItems.FlashSetItemCreationUpdateDTO;
import com.quizlet_be.quizlet.services.flashsetitem.FlashSetItem;
import com.quizlet_be.quizlet.services.flashsetitem.FlashSetItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/flashsetitems")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER'")
public class FlashSetItemController {

    private final FlashSetItemService flashSetItemService;

    @PostMapping("flashset/{flashSetId}")
    public FlashSetItem save(
            final @Valid @RequestBody FlashSetItemCreationUpdateDTO flashSetItemCreationDTO,
            final @PathVariable UUID flashSetId
    ) {
        return flashSetItemService.createNewFlashSetItem(flashSetItemCreationDTO, flashSetId);
    }

    @PutMapping("{flashSetItemId}/flashset/{flashSetId}")
    public FlashSetItem update(
            final @PathVariable UUID flashSetItemId,
            final @Valid @RequestBody FlashSetItemCreationUpdateDTO flashSetItemUpdateDTO,
            final @PathVariable UUID flashSetId
    ) {
        return flashSetItemService.updateFlashSetItem(flashSetItemId, flashSetItemUpdateDTO, flashSetId);
    }

    @DeleteMapping("/{flashSetItemId}/flashset/{flashSetId}")
    public void deleteByFlashSetIdAndItemId(
            final @PathVariable UUID flashSetItemId,
            final @PathVariable UUID flashSetId
    ) {
        flashSetItemService.deleteByFlashSetIdAndItemId(flashSetId, flashSetItemId);
    }
}
