package com.quizlet_be.quizlet.dto.users;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@NoArgsConstructor
@Getter
public class UserDTO {
    private UUID id;

    private String fullName;

    private String email;

    private String phoneNumber;

    private String address;

    private String codeResetPassword;

    private Instant createdAt;

    private boolean userDisabled;
}
