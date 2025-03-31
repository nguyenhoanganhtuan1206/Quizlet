package com.quizlet_be.quizlet.persistent.folder_flashset;

import jakarta.persistence.*;
import lombok.*;

import java.lang.reflect.GenericArrayType;
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

    private UUID flashSetId;
}
