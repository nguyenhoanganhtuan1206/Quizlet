package com.quizlet_be.quizlet.dto.folders;

import com.quizlet_be.quizlet.services.flashset.FlashSet;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
public class FolderSummaryDTO {

    private UUID id;

    private String name;

    private String description;

    private Instant createdAt;

    private Instant updatedAt;

    private UUID userId;

    private long flashSetCount;
}
