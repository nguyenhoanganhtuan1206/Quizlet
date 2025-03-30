package com.quizlet_be.quizlet.api.folder;

import com.quizlet_be.quizlet.dto.folders.FolderCreationDTO;
import com.quizlet_be.quizlet.dto.folders.FolderFlashSetDetailResponseDTO;
import com.quizlet_be.quizlet.dto.folders.FolderSummaryDTO;
import com.quizlet_be.quizlet.services.folders.Folder;
import com.quizlet_be.quizlet.services.folders.FolderService;
import com.quizlet_be.quizlet.utils.JwtTokenUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.quizlet_be.quizlet.error.ValidationErrorHandling.handleValidationError;

@RestController
@RequestMapping("/api/v1/folders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class FolderController {

    private final FolderService folderService;

    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping
    public Folder createFolder(final @Valid @RequestBody FolderCreationDTO folderCreationDTO,
                               final @RequestHeader(value = "Authorization") String authorizationHeader,
                               final BindingResult bindingResult) {
        handleValidationError(bindingResult);

        final UUID userId = jwtTokenUtil.getCurrentUserId(authorizationHeader);

        return folderService.createFolder(userId, folderCreationDTO);
    }

    @GetMapping("{folderId}")
    public FolderFlashSetDetailResponseDTO findByFolderId(final @PathVariable(name = "folderId") UUID folderId) {
        return folderService.findFolderDetail(folderId);
    }

    @GetMapping("{userId}/users")
    public List<FolderSummaryDTO> findByUserId(final @PathVariable UUID userId,
                                               final @RequestParam(value = "sort", defaultValue = "asc") String sort) {
        return folderService.findByUserId(userId, sort);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Folder> findAll(final @RequestParam(value = "sort", defaultValue = "asc") String sort) {
        return folderService.findAll(sort);
    }
}
