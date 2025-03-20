package com.quizlet_be.quizlet.dto.auths;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponseDTO {

    private String token;
}
