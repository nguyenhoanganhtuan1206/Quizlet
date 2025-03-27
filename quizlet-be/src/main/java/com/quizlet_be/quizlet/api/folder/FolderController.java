package com.quizlet_be.quizlet.api.folder;

import com.quizlet_be.quizlet.dto.folders.FolderCreationDTO;
import com.quizlet_be.quizlet.services.folders.Folder;
import com.quizlet_be.quizlet.services.folders.FolderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.quizlet_be.quizlet.error.ValidationErrorHandling.handleValidationError;

@RestController
@RequestMapping("/api/v1/folders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class FolderController {

    private final FolderService folderService;

    @PostMapping
    public Folder createFolder(final @Valid @RequestBody FolderCreationDTO folderCreationDTO,
                               final BindingResult bindingResult) {
        handleValidationError(bindingResult);

        return folderService.createFolder(folderCreationDTO);
    }

    @GetMapping
    public List<Folder> findFolderById(final @RequestParam(value = "sort", defaultValue = "asc") String sort) {
        return folderService.findFolderById(sort);
    }
}
