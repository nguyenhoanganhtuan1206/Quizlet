package com.quizlet_be.quizlet.dto.flashsets;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class FlashSetUpdateRequestDTO {

    @NotBlank(message = "The flashcard set name cannot be empty")
    private String name;

    private String description;

    private boolean isDrafted;
}
