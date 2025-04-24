package com.quizlet_be.quizlet.dto.folders;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Builder
@Getter
public class FolderCreateUpdateDTO {

    @NotBlank(message = "Your folder name cannot be empty")
    @Size(max = 150, message = "Your folder name cannot larger than 150 characters")
    private String name;

    @Size(max = 255, message = "Your folder description cannot exceeded 255 characters")
    private String description;

    private List<UUID> folderChildIds;
}
