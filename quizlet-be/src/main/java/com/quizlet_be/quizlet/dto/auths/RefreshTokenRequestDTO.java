package com.quizlet_be.quizlet.dto.auths;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RefreshTokenRequestDTO {

    private String refreshToken;
}
