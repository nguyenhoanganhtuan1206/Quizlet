package com.quizlet_be.quizlet.services.folder_flashset;

import com.quizlet_be.quizlet.persistent.folder_flashset.FolderFlashSetEntity;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class FolderFlashSetMapper {

    public static FolderFlashSet toFolderFlashSet(final FolderFlashSetEntity folderFlashSetEntity) {
        return FolderFlashSet.builder()
                .id(folderFlashSetEntity.getId())
                .flashSetId(folderFlashSetEntity.getFlashSetId())
                .folderId(folderFlashSetEntity.getFolderId())
                .build();
    }

    public static List<FolderFlashSet> toFolderFlashSets(final List<FolderFlashSetEntity> folderFlashSetEntities) {
        return folderFlashSetEntities
                .stream()
                .map(FolderFlashSetMapper::toFolderFlashSet)
                .toList();
    }
}
