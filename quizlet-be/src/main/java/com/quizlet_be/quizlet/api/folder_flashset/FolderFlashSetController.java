package com.quizlet_be.quizlet.api.folder_flashset;

import com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/folder_flashset")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class FolderFlashSetController {

    private final FolderFlashSetService folderFlashSetService;
}
