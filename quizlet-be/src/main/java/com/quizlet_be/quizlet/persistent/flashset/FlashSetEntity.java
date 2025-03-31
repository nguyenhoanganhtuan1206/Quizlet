package com.quizlet_be.quizlet.persistent.flashset;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "flashsets")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlashSetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;

    private String description;

    private Instant createdAt;

    private Instant updatedAt;

    @Column(name = "isdrafted")
    private boolean isDrafted;

    private UUID userId;
}
