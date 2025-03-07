package com.quizlet_be.quizlet.persistent.folders;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "folders")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class FolderEntity {

    @Id
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String name;

    private String description;

    private Instant createdAt;

    private Instant updatedAt;

    private UUID userId;
}
