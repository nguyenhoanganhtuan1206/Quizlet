package com.quizlet_be.quizlet.dto.folders;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.util.UUID;

@Getter
public class FolderCreationDTO {

    @NotBlank(message = "Your folder name cannot be empty")
    @Size(min = 5, max = 150, message = "Your folder name must be at between 5 to 150 characters")
    private String name;

    @Size(max = 255, message = "Your folder description cannot exceeded 255 characters")
    private String description;

    private UUID parentId;
}
