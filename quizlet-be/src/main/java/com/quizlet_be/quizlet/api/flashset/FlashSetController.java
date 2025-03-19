package com.quizlet_be.quizlet.api.flashset;

import com.quizlet_be.quizlet.services.flashset.FlashSet;
import com.quizlet_be.quizlet.services.flashset.FlashSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/flashsets")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class FlashSetController {

    private final FlashSetService flashSetService;

    @GetMapping("{folderId}/folder")
    public Set<FlashSet> findByFolderId(final @PathVariable UUID folderId) {
        return flashSetService.findFolderId(folderId);
    }
}
