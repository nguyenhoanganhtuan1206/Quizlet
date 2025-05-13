package com.quizlet_be.quizlet.persistent.folder_flashset;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "folder_flashset")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FolderFlashSetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private UUID folderId;

    @Column(name = "flashset_id")
    private UUID flashSetId;
}
