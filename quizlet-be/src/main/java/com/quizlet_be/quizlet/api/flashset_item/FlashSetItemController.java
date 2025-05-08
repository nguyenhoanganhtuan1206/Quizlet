package com.quizlet_be.quizlet.api.flashset_item;

import com.quizlet_be.quizlet.dto.flashsetItems.FlashSetItemCreationDTO;
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
            final @Valid @RequestBody FlashSetItemCreationDTO flashSetItemCreationDTO,
            final @PathVariable UUID flashSetId
    ) {
        return flashSetItemService.createNewFlashSetItem(flashSetItemCreationDTO, flashSetId);
    }

    @DeleteMapping("/{flashSetItemId}/flashset/{flashSetId}")
    public void deleteByFlashSetIdAndItemId(
            final @PathVariable UUID flashSetItemId,
            final @PathVariable UUID flashSetId
    ) {
        flashSetItemService.deleteByFlashSetIdAndItemId(flashSetId, flashSetItemId);
    }
}
