package com.quizlet_be.quizlet.api.flashset;

import com.quizlet_be.quizlet.dto.flashsets.FlashSetSummaryDTO;
import com.quizlet_be.quizlet.services.flashset.FlashSet;
import com.quizlet_be.quizlet.services.flashset.FlashSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/flashsets")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class FlashSetController {

    private final FlashSetService flashSetService;

    @GetMapping("{userId}/users")
    public List<FlashSetSummaryDTO> findAllByUserId(final @PathVariable("userId") UUID userId) {
        return flashSetService.findByUserId(userId);
    }

    @GetMapping("{folderId}/folder")
    public List<FlashSet> findByFolderId(final @PathVariable UUID folderId) {
        return flashSetService.findFolderId(folderId);
    }
}
