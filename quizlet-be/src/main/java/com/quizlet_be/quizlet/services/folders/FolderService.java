package com.quizlet_be.quizlet.services.folders;

import com.quizlet_be.quizlet.dto.folders.FolderCreationDTO;
import com.quizlet_be.quizlet.persistent.folders.FolderStore;
import com.quizlet_be.quizlet.utils.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.quizlet_be.quizlet.error.CommonError.supplyBadRequestException;
import static com.quizlet_be.quizlet.error.CommonError.supplyConflictException;
import static com.quizlet_be.quizlet.services.folders.FolderValidation.supplyFolderNotFound;
import static java.time.Instant.now;

@Service
@RequiredArgsConstructor
public class FolderService {

    private final FolderStore folderStore;

    private final JwtTokenUtil jwtTokenUtil;

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

    public List<Folder> findByUserId(final UUID userId, final String sortDirection) {
        Sort sort = Sort.by("createdAt");

        if ("desc".equalsIgnoreCase(sortDirection)) {
            sort = sort.descending();
        } else if ("asc".equalsIgnoreCase(sortDirection)) {
            sort = sort.ascending();
        } else {
            throw supplyBadRequestException("Sort direction must be 'asc' or 'desc'").get();
        }

        return folderStore.findByUserId(userId, sort);
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

    private void validateFolderIsExisted(final String name) {
        final Optional<Folder> folder = folderStore.findByName(name);

        if (folder.isPresent()) {
            throw supplyConflictException("Folder with %s already taken", name).get();
        }
    }
}
