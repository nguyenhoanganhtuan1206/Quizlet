package com.quizlet_be.quizlet.services.refreshtokens;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Builder
@Data
public class RefreshToken {

    private UUID id;

    private UUID userId;

    private String token;

    private Instant expiredAt;

    private Instant createdAt;

    private boolean revoked;
}
