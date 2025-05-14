package com.quizlet_be.quizlet.api.folder;

import com.quizlet_be.quizlet.dto.folders.FolderCreateUpdateDTO;
import com.quizlet_be.quizlet.dto.folders.FolderSummaryDTO;
import com.quizlet_be.quizlet.services.folders.Folder;
import com.quizlet_be.quizlet.services.folders.FolderService;
import com.quizlet_be.quizlet.utils.JwtTokenUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/folders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class FolderController {

    private final FolderService folderService;

    private final JwtTokenUtil jwtTokenUtil;

    @GetMapping
    public List<FolderSummaryDTO> findByUserId(
            final @RequestParam(value = "sort", defaultValue = "asc") String sort,
            final @RequestHeader(value = "Authorization") String authorizationHeader
    ) {
        final UUID userId = jwtTokenUtil.getCurrentUserId(authorizationHeader);
        return folderService.findByUserId(userId, sort);
    }

    @GetMapping("{folderId}")
    public FolderSummaryDTO findByFolderId(final @PathVariable(name = "folderId") UUID folderId) {
        return folderService.findFolderDetail(folderId);
    }

    @GetMapping("{folderId}/summaries")
    public List<FolderSummaryDTO> findSummariesByFolderId(
            final @PathVariable UUID folderId,
            final @RequestHeader(value = "Authorization") String authorizationHeader
    ) {
        final UUID userId = jwtTokenUtil.getCurrentUserId(authorizationHeader);
        return folderService.findByUserIdAndFolderId(userId, folderId);
    }

    @GetMapping("parent")
    public List<FolderSummaryDTO> findParentFoldersByUserId(final @RequestHeader(value = "Authorization") String authorizationHeader) {
        final UUID userId = jwtTokenUtil.getCurrentUserId(authorizationHeader);

        return folderService.findParentFoldersByUserId(userId);
    }

    @PostMapping
    public Folder createFolder(
            final @Valid @RequestBody FolderCreateUpdateDTO folderCreationDTO,
            final @RequestHeader(value = "Authorization") String authorizationHeader
    ) {
        final UUID userId = jwtTokenUtil.getCurrentUserId(authorizationHeader);

        return folderService.createFolder(userId, folderCreationDTO);
    }

    @PutMapping("{folderId}")
    public Folder updateFolder(
            final @PathVariable(name = "folderId") UUID folderId,
            final @Valid @RequestBody FolderCreateUpdateDTO folderUpdateDTO,
            final @RequestHeader(value = "Authorization") String authorizationHeader
    ) {
        final UUID userId = jwtTokenUtil.getCurrentUserId(authorizationHeader);

        return folderService.updateFolder(userId, folderId, folderUpdateDTO);
    }
}
