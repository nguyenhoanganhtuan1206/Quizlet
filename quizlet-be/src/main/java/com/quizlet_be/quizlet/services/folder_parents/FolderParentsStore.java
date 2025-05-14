package com.quizlet_be.quizlet.services.folder_parents;

import com.quizlet_be.quizlet.mapper.folder_parents.FolderParentsMapper;
import com.quizlet_be.quizlet.repositories.folder_parents.FolderParentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.quizlet_be.quizlet.mapper.folder_parents.FolderParentsMapper.*;

@Repository
@RequiredArgsConstructor
public class FolderParentsStore {

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
    public void delete(final FolderParents folderParents) {
        parentsRepository.delete(toFolderParentEntity(folderParents));
    }

    /**
    * Delete all the folder parent by Ids
    * */
    public void deleteAllById(final List<UUID> folderIds) {
        parentsRepository.deleteAllById(folderIds);
    }

    /**
     * List all the {@link FolderParents} by parentFolderId
     *
     * @param parentFolderId The ID of the parent folder.
     * @return The number of child folders.
     * @throws com.quizlet_be.quizlet.error.BadRequestException
     */
    public List<FolderParents> findByParentFolderId(final UUID parentFolderId) {
        return toFolderParents(parentsRepository.findByParentFolderId(parentFolderId));
    }

    /**
     * List all child folders id by parentFolderId
     *
     * @param parentFolderId The ID of the parent folder.
     * @return The number of child folders.
     * @throws com.quizlet_be.quizlet.error.BadRequestException
     */
    public List<UUID> findChildIdsByParentFolderId(final UUID parentFolderId) {
        return parentsRepository.findChildIdsByParentFolderId(parentFolderId);
    }

    /**
     * Find @FolderParents by parentFolderId and childFolderId
     *
     * @param {@link UUID} parentFolderId and {@link UUID} childFolderId
     * @return @{@link FolderParents}
     * @throws com.quizlet_be.quizlet.error.NotFoundException
     */
    public Optional<FolderParents> findByParentFolderIdAndChildFolderId(final UUID parentFolderId, final UUID childFolderId) {
        return parentsRepository.findByParentFolderIdAndChildFolderId(parentFolderId, childFolderId)
                .map(FolderParentsMapper::toFolderParent);
    }
}
