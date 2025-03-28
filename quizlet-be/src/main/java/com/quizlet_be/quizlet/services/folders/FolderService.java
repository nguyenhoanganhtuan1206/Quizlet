package com.quizlet_be.quizlet.services.folders;

import com.quizlet_be.quizlet.dto.folders.FolderCreationDTO;
import com.quizlet_be.quizlet.dto.folders.FolderSummaryDTO;
import com.quizlet_be.quizlet.persistent.folders.FolderStore;
import com.quizlet_be.quizlet.services.flashset.FlashSetService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.quizlet_be.quizlet.error.CommonError.supplyBadRequestException;
import static com.quizlet_be.quizlet.error.CommonError.supplyConflictException;
import static com.quizlet_be.quizlet.services.folders.FolderValidation.supplyFolderNotFound;
import static com.quizlet_be.quizlet.utils.SortUtilities.createSingleSort;
import static java.time.Instant.now;

@Service
@RequiredArgsConstructor
public class FolderService {

    private final FolderStore folderStore;

    private final FlashSetService flashSetService;

    public List<Folder> findAll(final String sortDirection) {
        Sort sort = Sort.by("createdAt");

        if ("desc".equalsIgnoreCase(sortDirection)) {
            sort = sort.descending();
        } else if ("asc".equalsIgnoreCase(sortDirection)) {
            sort = sort.ascending();
        } else {
            throw supplyBadRequestException("Sort direction must be 'asc' or 'desc'").get();
        }

        return folderStore.findAll(sort);
    }

    public List<FolderSummaryDTO> findByUserId(final UUID userId, final String sortDirection) {
        final Sort sort = createSingleSort(sortDirection, "createdAt");
        final List<Folder> folders = folderStore.findByUserId(userId, sort);

        return folders
                .stream()
                .map(this::mapToFolderSummaryDTO)
                .toList();
    }

    public Folder findById(final UUID id) {
        return folderStore.findById(id)
                .orElseThrow(supplyFolderNotFound("Id", id));
    }

    public Folder createFolder(final UUID userId, final FolderCreationDTO folderCreation) {
        validateFolderIsExisted(folderCreation.getName());

        final Folder folder = Folder.builder()
                .name(folderCreation.getName())
                .description(folderCreation.getDescription())
                .createdAt(now())
                .userId(userId)
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
