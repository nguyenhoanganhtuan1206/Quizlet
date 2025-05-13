package com.quizlet_be.quizlet.mapper.folder_parents;

import com.quizlet_be.quizlet.persistent.folder_parents.FolderParentsEntity;
import com.quizlet_be.quizlet.services.folder_parents.FolderParents;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class FolderParentsMapper {

    public static FolderParents toFolderParent(final FolderParentsEntity folderParentsEntity) {
        return FolderParents.builder()
                .id(folderParentsEntity.getId())
                .parentFolderId(folderParentsEntity.getParentFolderId())
                .childFolderId(folderParentsEntity.getChildFolderId())
                .createdAt(folderParentsEntity.getCreatedAt())
                .build();
    }

    public static List<FolderParents> toFolderParents(final List<FolderParentsEntity> folderParents) {
        return folderParents.stream()
                .map(FolderParentsMapper::toFolderParent)
                .toList();
    }

    public static FolderParentsEntity toFolderParentEntity(final FolderParents folderParent) {
        return FolderParentsEntity.builder()
                .id(folderParent.getId())
                .parentFolderId(folderParent.getParentFolderId())
                .childFolderId(folderParent.getChildFolderId())
                .createdAt(folderParent.getCreatedAt())
                .build();
    }

    public static List<FolderParentsEntity> toFolderParentEntities(final List<FolderParents> folderParents) {
        return folderParents.stream()
                .map(FolderParentsMapper::toFolderParentEntity)
                .toList();
    }
}
