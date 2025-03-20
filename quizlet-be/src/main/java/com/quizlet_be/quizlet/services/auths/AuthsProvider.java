package com.quizlet_be.quizlet.services.auths;

import com.quizlet_be.quizlet.error.UnauthorizedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthsProvider {

    public UserAuthenticationToken getCurrentAuthentication() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            throw new UnauthorizedException("Authentication failed. Please ensure that you have provided the correct credentials.");
        }

        return (UserAuthenticationToken) authentication;
    }

    public String getCurrentUserRole() {
        return getCurrentAuthentication().getRole();
    }

    public String getCurrentEmail() {
        return getCurrentAuthentication().getEmail();
    }

    public UUID getCurrentUserId() {
        return getCurrentAuthentication().getUserId();
    }
}
