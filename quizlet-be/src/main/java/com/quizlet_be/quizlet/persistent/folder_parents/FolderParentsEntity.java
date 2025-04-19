package com.quizlet_be.quizlet.persistent.folder_parents;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "folder_parents")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FolderParentsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "parent_folder_id")
    private UUID parentFolderId;

    @Column(name = "child_folder_id")
    private UUID childFolderId;

    private Instant createdAt;
}
