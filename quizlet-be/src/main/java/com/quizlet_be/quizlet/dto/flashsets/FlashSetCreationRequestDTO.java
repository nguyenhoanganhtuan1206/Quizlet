package com.quizlet_be.quizlet.dto.flashsets;

import com.quizlet_be.quizlet.dto.flashsetItems.FlashSetItemCreationDTO;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
public class FlashSetCreationRequestDTO {

    @NotBlank(message = "The flashcard set name cannot be empty")
    private String name;

    private String description;

    private Instant createdAt;

    private Instant updatedAt;

    private boolean isDrafted;

    private UUID folderId;

    private List<FlashSetItemCreationDTO> flashSetItems;
}
