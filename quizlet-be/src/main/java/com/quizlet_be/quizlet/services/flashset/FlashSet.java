package com.quizlet_be.quizlet.services.flashset;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

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

    @Value(value = "true")
    private boolean isDrafted;

    private UUID userId;
}
