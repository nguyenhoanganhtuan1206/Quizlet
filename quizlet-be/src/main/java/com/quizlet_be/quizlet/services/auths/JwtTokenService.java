package com.quizlet_be.quizlet.services.auths;

import com.quizlet_be.quizlet.properties.JwtProperties;
import com.quizlet_be.quizlet.services.roles.Role;
import com.quizlet_be.quizlet.services.roles.RoleService;
import com.quizlet_be.quizlet.services.users.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClock;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.*;

import static com.quizlet_be.quizlet.error.CommonError.supplyAccessDeniedException;
import static com.quizlet_be.quizlet.error.CommonError.supplyUnauthorizedException;
import static io.jsonwebtoken.lang.Strings.split;
import static io.micrometer.common.util.StringUtils.isBlank;

@Component
@RequiredArgsConstructor
public class JwtTokenService {

    private static final Clock clock = DefaultClock.INSTANCE;

    private final String CLAIM_ROLES = "roles";
    private final String CLAIM_USER_ID = "user_id";
    private final String CLAIM_USER_EMAIL = "email";

    private final RoleService roleService;

    @Autowired
    private final JwtProperties jwtProperties;

    public Authentication parse(final String token) {
        try {
            if (isBlank(token)) {
                throw supplyUnauthorizedException("This token is invalid. Please send another request with a valid token.").get();
            }

            final Claims claims = Jwts.parser()
                    .setSigningKey(jwtProperties.getSecret())
                    .parseClaimsJws(token)
                    .getBody();
            if (isBlank(claims.getSubject())) {
                throw supplyUnauthorizedException("This token is invalid. Please send another request with a valid token.").get();
            }

            isTokenExpired(claims);
            isValidUserInfo(claims);

            final UUID userId = UUID.fromString(claims.get(CLAIM_USER_ID, String.class));
            final String email = claims.getSubject();
            final String roles = claims.get(CLAIM_ROLES, String.class);

            List<GrantedAuthority> authorities = Collections.singletonList(
                    new SimpleGrantedAuthority("ROLE_" + roles)
            );

            return new UserAuthenticationToken(userId, email, authorities);
        } catch (Exception exception) {
            throw supplyUnauthorizedException("Authentication failed.").get();
        }
    }

    public String generateToken(final User user) {
        Map<String, Object> claims = new HashMap<>();
        final Role currentRole = roleService.findById(user.getRoleId());
        final Date expirationDate = new Date(clock.now().getTime() + jwtProperties.getExpiration() * 1000);

        // Put anything you want to contain in the token
        claims.put(CLAIM_USER_ID, user.getId());
        claims.put(CLAIM_USER_EMAIL, user.getEmail());
        claims.put(CLAIM_ROLES, currentRole.getName());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecret())
                .compact();
    }

    private void isTokenExpired(Claims claims) {
        if (claims.getExpiration().before(new Date())) {
            throw supplyAccessDeniedException("Your login session has expired. Please log in again.").get();
        }
    }

    private void isValidUserInfo(Claims claims) {
        final String userId = claims.get(CLAIM_USER_ID, String.class);
        final String roles = claims.get(CLAIM_ROLES, String.class);

        if (isBlank(userId) || isBlank(roles)) {
            throw supplyAccessDeniedException("Something went wrong!. Please log in again.").get();
        }
    }
}
