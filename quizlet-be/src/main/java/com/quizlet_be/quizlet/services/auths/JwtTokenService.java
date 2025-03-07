package com.quizlet_be.quizlet.services.auths;

import com.quizlet_be.quizlet.properties.JwtProperties;
import com.quizlet_be.quizlet.persistent.users.UserEntity;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import java.util.*;

import static com.quizlet_be.quizlet.error.CommonError.supplyAccessDeniedException;
import static com.quizlet_be.quizlet.error.CommonError.supplyUnauthorizedException;
import static io.jsonwebtoken.lang.Strings.split;
import static io.micrometer.common.util.StringUtils.isBlank;

@Component
@RequiredArgsConstructor
public class JwtTokenService {

    private final String CLAIM_ROLES = "roles";
    private final String CLAIM_USER_ID = "user_id";
    private final String CLAIM_USER_EMAIL = "email";

    @Autowired
    private final JwtProperties jwtProperties;

    public Authentication parse(final String token) {
        try {
            if (isBlank(token)) {
                throw supplyUnauthorizedException("This token is invalid. Please send another request with a valid token.").get();
            }

            final Claims claims = Jwts.parser()
                    .setSigningKey(jwtProperties.getSecret())
                    .parseClaimsJwt(token)
                    .getBody();

            if (isBlank(claims.getSubject())) {
                throw supplyUnauthorizedException("This token is invalid. Please send another request with a valid token.").get();
            }

            isTokenExpired(claims);
            isValidUserInfo(claims);

            final String userId = claims.get(CLAIM_USER_ID, String.class);
            final String roles = claims.get(CLAIM_ROLES, String.class);
            return new UsernamePasswordAuthenticationToken(
                    UUID.fromString(userId).toString(),
                    claims.getSubject(),
                    Arrays.stream(split(roles, ","))
                            .map(SimpleGrantedAuthority::new)
                            .toList()
            );
        } catch (Exception exception) {
            throw supplyUnauthorizedException("Authentication failed. Please ensure that you have provided the correct credentials.").get();
        }
    }

    public String generateToken(final UserEntity user) {
        Map<String, Object> claims = new HashMap<>();

        // Put anything you want to contain in the token
        claims.put(CLAIM_USER_ID, user.getId());
        claims.put(CLAIM_USER_EMAIL, user.getEmail());
        claims.put(CLAIM_ROLES, String.join(","));

        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpiration()))
                .signWith(SignatureAlgorithm.ES512, jwtProperties.getSecret())
                .setClaims(claims)
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
