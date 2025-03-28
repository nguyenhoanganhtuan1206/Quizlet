package com.quizlet_be.quizlet.utils;

import com.quizlet_be.quizlet.services.auths.JwtTokenService;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

import static com.quizlet_be.quizlet.error.CommonError.supplyUnauthorizedException;

@Component
@AllArgsConstructor
public class JwtTokenUtil {

    // JWT claim keys (match your generateToken method)
    private static final String USER_ID_CLAIMS = "user_id";
    private static final String ROLE = "role";

    private final JwtTokenService jwtTokenService;

    /**
     * Gets the current user's ID from the JWT in the SecurityContext or Authorization header.
     *
     * @param authorizationHeader the Authorization header (optional if using SecurityContext)
     * @return the user's UUID
     * @throws IllegalStateException if no valid token is found or parsing fails
     */
    public UUID getCurrentUserId(final String authorizationHeader) {
        final Claims claims = jwtTokenService.parseToken(extractTokenFromHeader(authorizationHeader));
        final String userId = claims.get(USER_ID_CLAIMS, String.class);

        if (userId.isEmpty()) {
            throw supplyUnauthorizedException("Invalid token").get();
        }

        return UUID.fromString(userId);
    }

    /**
     * Gets the current user's role from the JWT in the SecurityContext or Authorization header.
     *
     * @param authorizationHeader the Authorization header (optional if using SecurityContext)
     * @return the user's role
     * @throws IllegalStateException if no valid token is found or parsing fails
     */
    public String getCurrentUserRole(final String authorizationHeader) {
        final Claims claims = jwtTokenService.parseToken(extractTokenFromHeader(authorizationHeader));
        final String role = claims.get(ROLE, String.class);

        if (role.isEmpty()) {
            throw supplyUnauthorizedException("Invalid token").get();
        }

        return role;
    }

    /**
     * Extracts the JWT token from either the SecurityContext or the Authorization header.
     */
    private String extractTokenFromHeader(final String authorizationHeader) {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getCredentials() instanceof String jwtToken) {
            return jwtToken;
        }

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }

        throw supplyUnauthorizedException("No JWT token found in request").get();
    }
}
