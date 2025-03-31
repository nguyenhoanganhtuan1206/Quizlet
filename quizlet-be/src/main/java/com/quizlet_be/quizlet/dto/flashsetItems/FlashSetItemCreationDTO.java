package com.quizlet_be.quizlet.dto.flashsetItems;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FlashSetItemCreationDTO {

    private String answer;

    private String question;
}
