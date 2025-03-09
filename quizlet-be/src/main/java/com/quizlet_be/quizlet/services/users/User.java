package com.quizlet_be.quizlet.services.users;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Builder
public class User {

    private UUID id;

    private String fullName;

    private String email;

    private String password;

    private String codeResetPassword;

    private Instant lastSendResetPasswordAt;

    private Instant createdAt;

    private boolean accountDisabled;

    private Integer roleId;
}
