package com.quizlet_be.quizlet.services.flashset;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Builder
public class FlashSet {

    private UUID id;

    private String name;

    private String description;

    private Instant createdAt;

    private Instant updatedAt;

    private boolean isDrafted;

    private UUID userId;

    private UUID folderId;
}
