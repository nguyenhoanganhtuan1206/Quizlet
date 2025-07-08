package com.quizlet_be.quizlet.services.folder_parents;

import com.quizlet_be.quizlet.error.UnprocessableException;
import com.quizlet_be.quizlet.persistent.folders.FolderStore;
import com.quizlet_be.quizlet.services.folders.Folder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import static com.quizlet_be.quizlet.error.CommonError.*;
import static com.quizlet_be.quizlet.services.flashset.FlashSetError.supplyFlashSetNotFoundException;
import static com.quizlet_be.quizlet.services.folders.FolderError.supplyFolderNotFoundException;
import static java.lang.String.format;
import static java.time.Instant.now;

@Service
@Slf4j
@RequiredArgsConstructor
public class FolderParentsService {

    private final Logger LOGGER = Logger.getLogger(FolderParentsService.class.getName());

    private final FolderParentsStore folderParentsStore;

    private final FolderStore folderStore;

    /**
     * Create new @{@link FolderParents}
     *
     * @params @{@link FolderParents}
     */
    public FolderParents save(final FolderParents folderParents) {
        return folderParentsStore.save(folderParents);
    }

    /**
     * Add Folder children to the parent folder
     *
     * @params folderParentId
     * @params folderChildId
     */
    public FolderParents addFolderChildToFolder(final UUID folderParentId, final UUID folderChildId) {
        validateFolderAvailable(folderParentId, folderChildId);
        Optional<FolderParents> folderParents;

        try {
            folderParents = folderParentsStore.findByParentFolderIdAndChildFolderId(folderParentId, folderChildId);
        } catch (Exception ex) {
            throw supplyUnprocessableException("Something went wrong while you adding more folder. Please try it again.").get();
        }

        if (folderParents.isPresent()) {
            throw supplyConflictException("You have already added this Folder children within the Folder.").get();
        }

        try {
            final FolderParents folderParentsCreation = FolderParents.builder()
                    .parentFolderId(folderParentId)
                    .childFolderId(folderChildId)
                    .createdAt(now())
                    .build();

            return folderParentsStore.save(folderParentsCreation);
        } catch (UnprocessableException ex) {
            LOGGER.log(Level.SEVERE, "Error while add new Folder {addFolderChildToFolder | FolderParentsService} with message: ", ex.getMessage());
            throw supplyUnprocessableException("Unexpected occur while adding new Folder. Please try it again.").get();
        }
    }

    /**
     * Delete the @{@link FolderParents} by parentFolderId and childFolderId
     *
     * @throw NotFoundException
     */
    public FolderParents deleteByParentFolderIdAndChildrenId(final UUID parentFolderId, final UUID childFolderId) {
        validateFolderAvailable(parentFolderId, childFolderId);

        try {
            final FolderParents folderParent = findByParentFolderIdAndChildFolderId(parentFolderId, childFolderId);

            folderParentsStore.delete(folderParent);
            return folderParent;
        } catch (Exception ex) {
            throw supplyBadRequestException(ex.getMessage()).get();
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
            return folderParentsStore.findByParentFolderId(parentFolderId);
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
        return folderParentsStore.findByParentFolderIdAndChildFolderId(parentFolderId, childFolderId)
                .orElseThrow(supplyNotFoundException("Not found the folder with parentId %s and childFolder %f", parentFolderId, childFolderId));
    }

    /**
     * Validate whether the FlashSet or Folder is existed
     *
     * @param folderParentId
     * @param folderChildId
     */
    private void validateFolderAvailable(final UUID folderParentId, final UUID folderChildId) {
        final Optional<Folder> folderParent = folderStore.findById(folderParentId);
        final Optional<Folder> folderChild = folderStore.findById(folderChildId);

        if (folderParent.isEmpty()) {
            LOGGER.log(Level.SEVERE, format("Folder with ID %s is not existing!  {validateFlashSetAndFolderAvailable | FolderParentsService}", folderParentId));
            throw supplyFlashSetNotFoundException("ID", folderParentId).get();
        }

        if (folderChild.isEmpty()) {
            LOGGER.log(Level.SEVERE, format("Folder with ID %s is not existing!  {validateFlashSetAndFolderAvailable | FolderParentsService}", folderChildId));
            throw supplyFolderNotFoundException("ID", folderChildId).get();
        }
    }
}
