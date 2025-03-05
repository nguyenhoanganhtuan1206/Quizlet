package com.quizlet_be.quizlet.persistent.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String fullName;

    private String email;

    private String password;

    private String codeResetPassword;

    private Instant lastSendResetPasswordAt;

    private Instant createdAt;

    private boolean accountDisabled;

    private UUID roleId;
}
