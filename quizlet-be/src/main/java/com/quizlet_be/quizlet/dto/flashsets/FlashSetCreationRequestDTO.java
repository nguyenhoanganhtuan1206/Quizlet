package com.quizlet_be.quizlet.dto.flashsets;

import com.quizlet_be.quizlet.dto.flashsetItems.FlashSetItemCreationUpdateDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
public class FlashSetCreationRequestDTO {

    @NotBlank(message = "The flashcard set name cannot be empty")
    @Size(min = 1, max = 150, message = "Flash set title must be between 1 and 150 characters")
    private String name;

    @Size(max = 255, message = "Flash set description cannot exceed 255 characters")
    private String description;

    private boolean isDrafted;

    private List<UUID> folderIds;

    private List<FlashSetItemCreationUpdateDTO> flashSetItems;
}
