package com.quizlet_be.quizlet.services.folders;

import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.UUID;

import static com.quizlet_be.quizlet.error.CommonError.supplyAccessDeniedError;
import static com.quizlet_be.quizlet.error.CommonError.supplyConflictException;

@UtilityClass
public class FolderValidation {

    public static void validateDuplicatedChildFolder(
            final UUID folderId,
            final List<UUID> folderChildIds
    ) {
        final boolean isDuplicatedChildFolderId = folderChildIds.contains(folderId);

        if (isDuplicatedChildFolderId) {
            throw supplyConflictException("Duplicate child folder IDs detected in update for folder ID: " + folderId).get();
        }
    }

    public static void validateRestrictFolderAccess(final UUID currentUser, final UUID ownerIdFolder) {
        if (!currentUser.toString().equalsIgnoreCase(ownerIdFolder.toString())) {
            throw supplyAccessDeniedError().get();
        }
    }
}
