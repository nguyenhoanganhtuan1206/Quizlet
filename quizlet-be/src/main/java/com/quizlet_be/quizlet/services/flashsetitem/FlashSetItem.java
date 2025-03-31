package com.quizlet_be.quizlet.services.flashsetitem;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Builder
public class FlashSetItem {
    private UUID id;

    private String question;

    private String answer;

    private Instant createdAt;

    private Instant updatedAt;

    private UUID flashsetId;
}
