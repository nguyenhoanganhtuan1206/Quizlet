package com.quizlet_be.quizlet.services.folders;

import com.quizlet_be.quizlet.persistent.folders.FolderEntity;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class FolderMapper {

    public static Folder toFolder(final FolderEntity folderEntity) {
        return Folder.builder()
                .id(folderEntity.getId())
                .name(folderEntity.getName())
                .description(folderEntity.getDescription())
                .createdAt(folderEntity.getCreatedAt())
                .updatedAt(folderEntity.getUpdatedAt())
                .userId(folderEntity.getUserId())
                .parentId(folderEntity.getParentId())
                .build();
    }

    public static List<Folder> toFolders(final List<FolderEntity> folderEntities) {
        return folderEntities.stream()
                .map(FolderMapper::toFolder)
                .toList();
    }
}
