package com.quizlet_be.quizlet.persistent.folders;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "folders")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FolderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;

    private String description;

    private Instant createdAt;

    private Instant updatedAt;

    private UUID parentId;

    private UUID userId;
}
