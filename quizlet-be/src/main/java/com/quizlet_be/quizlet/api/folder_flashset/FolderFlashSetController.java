package com.quizlet_be.quizlet.api.folder_flashset;

import com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSet;
import com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/folder_flashsets")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class FolderFlashSetController {

    private final FolderFlashSetService folderFlashSetService;

    @PostMapping("{flashSetId}/update_material/{folderId}")
    public FolderFlashSet addFlashSetToFolder(
            final @PathVariable(name = "folderId") UUID folderId,
            final @PathVariable(name = "flashSetId") UUID flashSetId
    ) {
        return folderFlashSetService.addMoreMaterialToFolder(folderId, flashSetId);
    }

    @DeleteMapping("{flashSetId}/update_material/{folderId}")
    public FolderFlashSet deleteFlashSetFromFolder(
            final @PathVariable UUID flashSetId,
            final @PathVariable UUID folderId
    ) {
        return folderFlashSetService.deleteMaterialFromFolder(folderId, flashSetId);
    }
}
