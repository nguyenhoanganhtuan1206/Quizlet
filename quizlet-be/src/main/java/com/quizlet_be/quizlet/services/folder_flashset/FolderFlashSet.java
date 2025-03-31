package com.quizlet_be.quizlet.services.folder_flashset;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class FolderFlashSet {

    private UUID id;

    private UUID folderId;

    private UUID flashSetId;
}
