package com.quizlet_be.quizlet.dto.flashsetItems;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FlashSetItemCreationUpdateDTO {

    @NotBlank(message = "Your answer cannot be empty")
    @Size(max = 200, message = "Your answer cannot exceed 200 characters")
    private String answer;

    @Size(max = 200, message = "Your question cannot exceed 200 characters")
    private String question;

    private int orderPosition;
}
