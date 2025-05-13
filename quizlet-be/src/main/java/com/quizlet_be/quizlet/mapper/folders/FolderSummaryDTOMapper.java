package com.quizlet_be.quizlet.mapper.folders;

import com.quizlet_be.quizlet.dto.folders.FolderSummaryDTO;
import com.quizlet_be.quizlet.services.folders.Folder;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class FolderSummaryDTOMapper {


    public static FolderSummaryDTO toFolderSummaryDTO(final Folder folder) {
        return FolderSummaryDTO.builder()
                .id(folder.getId())
                .name(folder.getName())
                .description(folder.getDescription())
                .createdAt(folder.getCreatedAt())
                .updatedAt(folder.getUpdatedAt())
                .userId(folder.getUserId())
                .build();
    }

    public static List<FolderSummaryDTO> toFolderSummaryDTOs(final List<Folder> folders) {
        return folders.stream()
                .map(FolderSummaryDTOMapper::toFolderSummaryDTO)
                .toList();
    }
}
