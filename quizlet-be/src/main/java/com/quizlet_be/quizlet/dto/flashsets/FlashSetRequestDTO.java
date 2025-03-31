package com.quizlet_be.quizlet.dto.flashsets;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Builder
public class FlashSetRequestDTO {

    @NotBlank(message = "The flashcard set name cannot be empty")
    private String name;

    private String description;

    private Instant createdAt;

    private Instant updatedAt;

    private boolean isDrafted;
}
