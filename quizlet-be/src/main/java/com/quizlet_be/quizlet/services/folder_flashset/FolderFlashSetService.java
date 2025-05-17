package com.quizlet_be.quizlet.services.folder_flashset;

import com.quizlet_be.quizlet.error.UnprocessableException;
import com.quizlet_be.quizlet.persistent.flashset.FlashSetStore;
import com.quizlet_be.quizlet.persistent.folder_flashset.FolderFlashSetStore;
import com.quizlet_be.quizlet.persistent.folders.FolderStore;
import com.quizlet_be.quizlet.services.flashset.FlashSet;
import com.quizlet_be.quizlet.services.folders.Folder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import static com.quizlet_be.quizlet.error.CommonError.*;
import static com.quizlet_be.quizlet.services.flashset.FlashSetError.supplyFlashSetNotFoundException;
import static com.quizlet_be.quizlet.services.folders.FolderError.supplyFolderNotFoundException;
import static java.lang.String.format;

@Service
@RequiredArgsConstructor
public class FolderFlashSetService {

    private final Logger LOGGER = Logger.getLogger(FolderStore.class.getName());

    private final FolderFlashSetStore folderFlashSetStore;

    private final FlashSetStore flashSetStore;

    private final FolderStore folderStore;

    public FolderFlashSet save(final FolderFlashSet folderFlashSet) {
        return folderFlashSetStore.save((folderFlashSet));
    }

    public FolderFlashSet findByFolderIdAndFlashSetId(final UUID folderId, final UUID flashSetId) {
        LOGGER.log(Level.SEVERE, format(
                "The Folder ID %s and FlashSet ID %s are not existed {findByFolderIdAndFlashSetId | FolderFlashSetService}", flashSetId, folderId
        ));
        return folderFlashSetStore.findByFolderIdAndFlashSetId(folderId, flashSetId)
                .orElseThrow(supplyNotFoundException("The Folder or FlashSet is not existed. Please try it again"));
    }

    /**
     * Add FlashSet to Folder
     *
     * @param flashSetId
     * @param folderId
     * @return FolderFlashSet
     */
    public FolderFlashSet addMoreMaterialToFolder(final UUID folderId, final UUID flashSetId) {
        validateFlashSetAndFolderAvailable(folderId, flashSetId);

        final Optional<FolderFlashSet> folderFlashSet = folderFlashSetStore.findByFolderIdAndFlashSetId(folderId, flashSetId);

        if (folderFlashSet.isPresent()) {
            throw supplyConflictException("You have already added this FlashSet Card within the Folder.").get();
        }

        try {
            final FolderFlashSet folderFlashSetCreation = FolderFlashSet.builder()
                    .flashSetId(flashSetId)
                    .folderId(folderId)
                    .build();

            return folderFlashSetStore.save(folderFlashSetCreation);
        } catch (UnprocessableException ex) {
            LOGGER.log(Level.SEVERE, "Error adding FlashSet from Folder {FolderFlashSet | FolderFlashSetService}: ", ex.getMessage());
            throw supplyUnprocessableException("Unexpected error while add FlashSet to the current Folder.").get();
        }
    }

    /**
     * Remove FlashSet from Folder
     *
     * @param flashSetId
     * @param folderId
     * @return FolderFlashSet
     */
    public FolderFlashSet deleteMaterialFromFolder(final UUID folderId, final UUID flashSetId) {
        validateFlashSetAndFolderAvailable(folderId, flashSetId);
        final FolderFlashSet folderFlashSetDeletion = findByFolderIdAndFlashSetId(folderId, flashSetId);

        try {
            folderFlashSetStore.delete(folderFlashSetDeletion);

            return folderFlashSetDeletion;
        } catch (UnprocessableException exception) {
            LOGGER.log(Level.SEVERE, "Error deleting FlashSet from Folder {deleteMaterialFromFolder | FolderFlashSetService}: ", exception.getMessage());
            throw supplyUnprocessableException("Unexpected error occur when try to remove your FlashSet. Please try it again.").get();
        }
    }

    /**
     * Validate whether the FlashSet or Folder is existed
     *
     * @param folderId
     * @param flashSetId
     */
    private void validateFlashSetAndFolderAvailable(final UUID folderId, final UUID flashSetId) {
        final Optional<FlashSet> flashSet = flashSetStore.findById(flashSetId);
        final Optional<Folder> folder = folderStore.findById(folderId);

        if (flashSet.isEmpty()) {
            LOGGER.log(Level.SEVERE, format("FlashSet with ID %s is not existing!", flashSetId));
            throw supplyFlashSetNotFoundException("ID", flashSetId).get();
        }

        if (folder.isEmpty()) {
            LOGGER.log(Level.SEVERE, format("Folder with ID %s is not existing!", flashSetId));
            throw supplyFolderNotFoundException("ID", flashSetId).get();
        }
    }
}
