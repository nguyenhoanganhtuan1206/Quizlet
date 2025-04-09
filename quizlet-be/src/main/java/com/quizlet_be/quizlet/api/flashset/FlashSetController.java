package com.quizlet_be.quizlet.api.flashset;

import com.quizlet_be.quizlet.dto.flashsets.FlashSetCreationRequestDTO;
import com.quizlet_be.quizlet.dto.flashsets.FlashSetDetailResponseDTO;
import com.quizlet_be.quizlet.dto.flashsets.FlashSetSummaryDTO;
import com.quizlet_be.quizlet.dto.flashsets.FlashSetUpdateRequestDTO;
import com.quizlet_be.quizlet.services.flashset.FlashSet;
import com.quizlet_be.quizlet.services.flashset.FlashSetService;
import com.quizlet_be.quizlet.utils.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/flashsets")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class FlashSetController {

    private final FlashSetService flashSetService;

    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping
    public FlashSetDetailResponseDTO createFlashSet(
            final @RequestBody FlashSetCreationRequestDTO flashSetRequestDTO,
            final @RequestHeader(value = "Authorization") String authorizationHeader
    ) {
        final UUID userId = jwtTokenUtil.getCurrentUserId(authorizationHeader);

        return flashSetService.createFlashSet(flashSetRequestDTO, userId);
    }

    @PutMapping("{flashSetId}")
    public FlashSet updateFlashSet(
            final @PathVariable UUID flashSetId,
            final @RequestBody FlashSetUpdateRequestDTO flashSetRequestDTO,
            final @RequestHeader(value = "Authorization") String authorizationHeader
    ) {
        final UUID userId = jwtTokenUtil.getCurrentUserId(authorizationHeader);

        return flashSetService.updateFlashSet(userId, flashSetId, flashSetRequestDTO);
    }

    @GetMapping("{userId}/users")
    public List<FlashSetSummaryDTO> findAllByUserId(final @PathVariable("userId") UUID userId) {
        return flashSetService.findByUserId(userId);
    }

    @GetMapping("{folderId}/folder")
    public List<FlashSet> findByFolderId(final @PathVariable UUID folderId) {
        return flashSetService.findByFolderId(folderId);
    }
}
