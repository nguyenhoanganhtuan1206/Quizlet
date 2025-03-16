package com.quizlet_be.quizlet.persistent.users;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String fullName;

    private String email;

    private String password;

    private String codeResetPassword;

    private Instant lastSendResetPasswordAt;

    private Instant createdAt;

    private boolean accountDisabled;

    private String image;

    private Integer roleId;
}
