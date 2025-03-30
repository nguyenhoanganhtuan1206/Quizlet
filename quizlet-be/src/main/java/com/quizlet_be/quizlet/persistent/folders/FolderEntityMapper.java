package com.quizlet_be.quizlet.persistent.folders;

import com.quizlet_be.quizlet.services.folders.Folder;
import lombok.experimental.UtilityClass;

@UtilityClass
public class FolderEntityMapper {

    public static FolderEntity toFolderEntity(final Folder folder) {
        return FolderEntity.builder()
                .id(folder.getId())
                .name(folder.getName())
                .description(folder.getDescription())
                .createdAt(folder.getCreatedAt())
                .updatedAt(folder.getUpdatedAt())
                .userId(folder.getUserId())
                .parentId(folder.getParentId())
                .build();
    }
}
