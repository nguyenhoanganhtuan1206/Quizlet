package com.quizlet_be.quizlet.services.folder_parents;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Builder
@Getter
@Setter
public class FolderParents {

    private UUID id;

    private UUID parentFolderId;

    private UUID childFolderId;

    private Instant createdAt;
}