package com.quizlet_be.quizlet.services.folder_parents;

import com.quizlet_be.quizlet.repositories.folder_parents.FolderParentsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.quizlet_be.quizlet.error.CommonError.supplyBadRequestException;
import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;
import static com.quizlet_be.quizlet.mapper.folder_parents.FolderParentsMapper.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class FolderParentsService {

    private final FolderParentsRepository parentsRepository;

    /**
     * Create new @{@link FolderParents}
     *
     * @params @{@link FolderParents}
     */
    public FolderParents save(final FolderParents parents) {
        return toFolderParent(parentsRepository.save(toFolderParentEntity(parents)));
    }

    /**
     * Delete the @{@link FolderParents} by parentFolderId and childFolderId
     *
     * @throw NotFoundException
     */
    public void deleteByParentFolderId(final UUID parentFolderId, final UUID childFolderId) {
        try {
            final FolderParents folderParent = findByParentFolderIdAndChildFolderId(parentFolderId, childFolderId);

            parentsRepository.delete(toFolderParentEntity(folderParent));
        } catch (Exception ex) {
            throw supplyBadRequestException(ex.getMessage()).get();
        }
    }

    /**
     * Counts the number of child folders for a given parent folder.
     *
     * @param parentFolderId The ID of the parent folder.
     * @return The number of child folders.
     * @throws com.quizlet_be.quizlet.error.BadRequestException
     */
    public long countByParentFolderId(final UUID parentFolderId) {
        try {
            return parentsRepository.countByParentFolderId(parentFolderId);
        } catch (Exception e) {
            log.error("Unexpected error while counting child folders for parent folder ID {}: {}", parentFolderId, e.getMessage(), e);
            throw supplyBadRequestException("An unexpected error occurred while counting child folders. Please try again later.").get();
        }
    }

    /**
     * List all the {@link FolderParents} by parentFolderId
     *
     * @param parentFolderId The ID of the parent folder.
     * @return The number of child folders.
     * @throws com.quizlet_be.quizlet.error.BadRequestException
     */
    public List<FolderParents> findByParentFolderId(final UUID parentFolderId) {
        try {
            return toFolderParents(parentsRepository.findByParentFolderId(parentFolderId));
        } catch (Exception e) {
            log.error("Unexpected error while list FolderParents by parentId {findByParentFolderId} {}: {}", parentFolderId, e.getMessage(), e);
            throw supplyBadRequestException("An unexpected error occurred while list folders. Please try again later.").get();
        }
    }

    /**
     * Find @FolderParents by parentFolderId and childFolderId
     *
     * @param {@link UUID} parentFolderId and {@link UUID} childFolderId
     * @return @{@link FolderParents}
     * @throws com.quizlet_be.quizlet.error.NotFoundException
     */
    public FolderParents findByParentFolderIdAndChildFolderId(final UUID parentFolderId, final UUID childFolderId) {
        return toFolderParent(parentsRepository.findByParentFolderIdAndChildFolderId(parentFolderId, childFolderId)
                .orElseThrow(supplyNotFoundException("Not found the folder with parentId %s and childFolder %f", parentFolderId, childFolderId)));
    }
}
