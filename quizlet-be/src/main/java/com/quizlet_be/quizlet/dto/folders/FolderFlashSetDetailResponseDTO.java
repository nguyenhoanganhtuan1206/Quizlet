package com.quizlet_be.quizlet.dto.folders;

import com.quizlet_be.quizlet.services.flashset.FlashSet;
import com.quizlet_be.quizlet.services.folders.Folder;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
public class FolderFlashSetDetailResponseDTO {

    private Folder folder;

    public List<FolderSummaryDTO> foldersSummaryChildren;

    public List<FlashSet> flashSets;
}
