package com.quizlet_be.quizlet.persistent.flashset;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "flashset")
@Getter
@Builder
public class FlashSetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;

    private String description;

    private Instant createdAt;

    private Instant updatedAt;

    private UUID folderId;
}
