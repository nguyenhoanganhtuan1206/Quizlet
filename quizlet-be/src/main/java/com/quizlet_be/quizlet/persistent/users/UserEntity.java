package com.quizlet_be.quizlet.persistent.users;

import com.quizlet_be.quizlet.persistent.roles.RoleEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Set;
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

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email", unique = true)
    private String email;

    private String password;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String address;

    @Column(name = "code_reset_password")
    private String codeResetPassword;

    @Column(name = "last_send_reset_password_at")
    private Instant lastSendResetPasswordAt;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "account_disabled")
    private boolean accountDisabled;

    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<RoleEntity> roles;
}
