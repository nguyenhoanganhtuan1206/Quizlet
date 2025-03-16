package com.quizlet_be.quizlet.services.auths;

import lombok.Getter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.UUID;

import static com.quizlet_be.quizlet.error.CommonError.supplyAccessDeniedError;

@Getter
public class UserAuthenticationToken extends UsernamePasswordAuthenticationToken {

    private final UUID userId;

    private final String email;

    private final String role;

    public UserAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(principal, credentials, authorities);

        validatePrincipal(principal);
        validateCredentials(credentials);

        this.userId = (UUID) principal;
        this.email = (String) credentials;

        this.role = authorities.stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElseThrow(() -> new IllegalArgumentException("No authorities provided in the token."));
    }

    private void validatePrincipal(final Object principal) {
        if (!(principal instanceof UUID)) {
            throw supplyAccessDeniedError().get();
        }
    }

    private void validateCredentials(final Object credentials) {
        if (!(credentials instanceof String)) {
            throw supplyAccessDeniedError().get();
        }
    }
}
