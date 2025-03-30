package com.quizlet_be.quizlet.services.folders;

import com.quizlet_be.quizlet.dto.folders.FolderCreationDTO;
import com.quizlet_be.quizlet.dto.folders.FolderFlashSetDetailResponseDTO;
import com.quizlet_be.quizlet.dto.folders.FolderSummaryDTO;
import com.quizlet_be.quizlet.persistent.folders.FolderStore;
import com.quizlet_be.quizlet.services.flashset.FlashSet;
import com.quizlet_be.quizlet.services.flashset.FlashSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.quizlet_be.quizlet.error.CommonError.supplyConflictException;
import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;
import static com.quizlet_be.quizlet.utils.SortUtilities.createSingleSort;
import static java.time.Instant.now;

@Service
@RequiredArgsConstructor
public class FolderService {

    private final FolderStore folderStore;

    private final FlashSetService flashSetService;

    public List<Folder> findAll(final String sortDirection) {
        final Sort sort = createSingleSort(sortDirection, "createdAt");

        return folderStore.findAll(sort);
    }

    public Folder findById(final UUID folderId) {
        return folderStore.findById(folderId)
                .orElseThrow(supplyNotFoundException("The folder ID with %s not existed!", folderId));
    }

    public FolderFlashSetDetailResponseDTO findFolderDetail(final UUID folderId) {
        final Folder folder = findById(folderId);
        final List<Folder> foldersChildren = findByParentId(folder.getId());
        final List<FlashSet> flashSets = flashSetService.findFolderId(folderId);

        return FolderFlashSetDetailResponseDTO.builder()
                .folder(folder)
                .foldersChildren(foldersChildren)
                .flashSets(flashSets)
                .build();
    }

    public List<Folder> findByParentId(final UUID parentId) {
        return folderStore.findByParent(parentId);
    }

    public List<FolderSummaryDTO> findByUserId(final UUID userId, final String sortDirection) {
        final Sort sort = createSingleSort(sortDirection, "createdAt");
        final List<Folder> folders = folderStore.findByUserId(userId, sort);

        return folders
                .stream()
                .map(this::mapToFolderSummaryDTO)
                .toList();
    }

    public Folder createFolder(final UUID userId, final FolderCreationDTO folderCreation) {
        validateFolderIsExisted(folderCreation.getName());

        final Folder folder = Folder.builder()
                .name(folderCreation.getName())
                .description(folderCreation.getDescription())
                .createdAt(now())
                .userId(userId)
                .parentId(folderCreation.getParentId())
                .build();

        return folderStore.save(folder);
    }

    private FolderSummaryDTO mapToFolderSummaryDTO(final Folder folder) {
        final long countByFolderId = flashSetService.countByFolderId(folder.getId());

        return FolderSummaryDTO.builder()
                .id(folder.getId())
                .name(folder.getName())
                .description(folder.getDescription())
                .updatedAt(folder.getUpdatedAt())
                .createdAt(folder.getCreatedAt())
                .userId(folder.getUserId())
                .flashSetCount(countByFolderId)
                .build();
    }

    private void validateFolderIsExisted(final String name) {
        final Optional<Folder> folder = folderStore.findByName(name);

        if (folder.isPresent()) {
            throw supplyConflictException("Folder with %s already taken", name).get();
        }
    }
}
