package com.quizlet_be.quizlet.dto.auths;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class JwtTokenResponseDTO {

    private final UUID userId;

    private final String email;

    private final String username;

    private final Set<String> roles;

    private final String token;
}
