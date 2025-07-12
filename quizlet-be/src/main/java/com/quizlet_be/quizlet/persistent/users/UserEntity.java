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

    private String userGoogleId;

    private String userFacebookId;

    private String codeResetPassword;

    private Instant lastSendResetPasswordAt;

    private Instant createdAt;

    private Instant lastLoginAt;

    private boolean accountDisabled;

    private String profilePictureUrl;

    private Integer roleId;
}
