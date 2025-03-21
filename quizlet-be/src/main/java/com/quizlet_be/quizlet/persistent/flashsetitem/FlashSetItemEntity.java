package com.quizlet_be.quizlet.persistent.flashsetitem;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "flashsetitem")
@Getter
@Builder
public class FlashSetItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String question;

    private String answer;

    private Instant createdAt;

    private Instant updatedAt;

    private UUID flashsetId;
}
