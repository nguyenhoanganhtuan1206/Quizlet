package com.quizlet_be.quizlet.services.auths;

import com.quizlet_be.quizlet.properties.JwtProperties;
import com.quizlet_be.quizlet.services.roles.Role;
import com.quizlet_be.quizlet.services.roles.RoleService;
import com.quizlet_be.quizlet.services.users.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Clock;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.quizlet_be.quizlet.error.CommonError.supplyAccessDeniedException;
import static com.quizlet_be.quizlet.error.CommonError.supplyBadRequestException;
import static io.micrometer.common.util.StringUtils.isBlank;

@Component
@RequiredArgsConstructor
public class JwtTokenService {

    private final JwtProperties jwtProperties;
    private final RoleService roleService;

    @Bean
    private Clock clock() {
        return Clock.systemUTC();
    }

    /**
     * Generates a JWT token for the given user.
     *
     * @param user The user entity
     * @return A signed JWT token
     * @throws BadRequestException if user or role data is invalid
     */
    public String generateToken(final User user) {
        System.out.println("User generateToken " + user);
        if (user == null || user.getEmail() == null) {
            throw supplyBadRequestException("User and email cannot be null").get();
        }

        final Map<String, Object> claims = new HashMap<>();
        final Role currentRole = roleService.findById(user.getRoleId());
        if (currentRole == null) {
            throw supplyBadRequestException("Role not found for ID: " + user.getRoleId()).get();
        }

        long nowMillis = clock().millis();
        final Date expirationDate = new Date(nowMillis + jwtProperties.getExpiration() * 1000);

        SecretKey key = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .claims(claims)
                .subject(user.getEmail())
                .issuedAt(new Date(nowMillis))
                .expiration(expirationDate)
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    /**
     * Parses and validates a JWT token, returning its claims.
     *
     * @param token The JWT token to parse
     * @return Claims extracted from the token
     * @throws AccessDeniedException if the token is invalid, expired, or malformed
     */
    public Claims parseToken(String token) {
        if (isBlank(token)) {
            throw supplyAccessDeniedException("Token cannot be null or empty").get();
        }

        try {
            SecretKey key = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8));

            return Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException e) {
            throw supplyAccessDeniedException("Token has expired", e).get();
        } catch (UnsupportedJwtException | MalformedJwtException e) {
            throw supplyAccessDeniedException("Invalid token format", e).get();
        } catch (io.jsonwebtoken.security.SignatureException e) {
            throw supplyAccessDeniedException("Invalid token signature", e).get();
        } catch (IllegalArgumentException e) {
            throw supplyAccessDeniedException("Token cannot be parsed", e).get();
        }
    }
}