package com.quizlet_be.quizlet.api.folder_parents;

import com.quizlet_be.quizlet.services.folder_parents.FolderParents;
import com.quizlet_be.quizlet.services.folder_parents.FolderParentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/folder_parents")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class FolderParentController {

    private final FolderParentsService folderParentsService;

    @PostMapping("{folderChildId}/update_material/{folderId}")
    public FolderParents addFolderChildToFolder(final @PathVariable UUID folderChildId, final @PathVariable(name = "folderId") UUID folderParentId) {
        return folderParentsService.addFolderChildToFolder(folderParentId, folderChildId);
    }

    @DeleteMapping("{folderChildId}/update_material/{folderId}")
    public FolderParents deleteFolderChildFromFolder(final @PathVariable UUID folderChildId, final @PathVariable(name = "folderId") UUID folderParentId) {
        return folderParentsService.deleteByParentFolderIdAndChildrenId(folderParentId, folderChildId);
    }
}
