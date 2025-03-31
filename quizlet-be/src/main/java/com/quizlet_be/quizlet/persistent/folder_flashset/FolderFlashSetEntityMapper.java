package com.quizlet_be.quizlet.persistent.folder_flashset;

import com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSet;
import lombok.experimental.UtilityClass;

@UtilityClass
public class FolderFlashSetEntityMapper {

    public static FolderFlashSetEntity toFolderFlashSetEntity(final FolderFlashSet flashSet) {
        return FolderFlashSetEntity.builder()
                .id(flashSet.getId())
                .flashSetId(flashSet.getFlashSetId())
                .folderId(flashSet.getFolderId())
                .build();
    }
}
