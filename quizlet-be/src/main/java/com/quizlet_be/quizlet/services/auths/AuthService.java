package com.quizlet_be.quizlet.services.auths;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.quizlet_be.quizlet.persistent.users.UserStore;
import com.quizlet_be.quizlet.services.roles.Role;
import com.quizlet_be.quizlet.services.roles.RoleService;
import com.quizlet_be.quizlet.services.users.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Optional;

import static com.quizlet_be.quizlet.error.CommonError.supplyUnprocessableException;
import static com.quizlet_be.quizlet.persistent.users.UserEntityMapper.toUserEntity;
import static java.time.Instant.now;

@Service
@RequiredArgsConstructor
public class SocialAuthService {

    private JwtTokenService jwtTokenService;

    private final UserStore userStore;

    private final RoleService roleService;

    @Value("${google.oauth2.client-id}")
    private String googleClientId;

    @Transactional
    public String processSocialLogin(final String idToken) {
        // Determine Provider and Verify token
        try {
            final GoogleIdToken.Payload googlePayload = verifyGoogleIdToken(idToken);

            if (googlePayload != null) {
                return handleGoogleLogin(googlePayload);
            }

            throw supplyUnprocessableException("Invalid or unsupported ID token provided.").get();
        } catch (Exception ex) {
            throw supplyUnprocessableException("Unexpected error occur while log in to Google").get();
        }
    }

    private String handleGoogleLogin(final GoogleIdToken.Payload googlePayload) {
        try {
            final Role role = roleService.findByName("USER");
            final String email = googlePayload.getEmail();
            final String googleId = googlePayload.getSubject();
            final String name = googlePayload.get("name").toString();
            final String profilePictureUrl = googlePayload.get("picture").toString();

            final Optional<User> userLogIn = userStore.findByUserGoogleId(googleId);

            // User not exist
            if (userLogIn.isEmpty()) {
                final User user = User.builder()
                        .fullName(name)
                        .email(email)
                        .userGoogleId(googleId)
                        .profilePictureUrl(profilePictureUrl)
                        .createdAt(now())
                        .roleId(role.getId())
                        .build();

                return jwtTokenService.generateToken(user);
            }

            // User existing but different login methods
            final User currentUser = userLogIn.get();

            currentUser.setLastLoginAt(now());
            currentUser.setUserGoogleId(googleId);

            return jwtTokenService.generateToken(currentUser);
        } catch (Exception ex) {
            throw supplyUnprocessableException("Unexpected error occur while log in to Google").get();
        }
    }

    private GoogleIdToken.Payload verifyGoogleIdToken(final String idTokenStr) throws GeneralSecurityException, IOException {
        final GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(), GsonFactory.getDefaultInstance()
        ).setAudience(Collections.singleton(googleClientId))
                .setIssuer("https://accounts.google.com")
                .build();
        final GoogleIdToken googleIdToken = verifier.verify(idTokenStr);

        if (googleIdToken == null) {
            throw new GeneralSecurityException("Google ID token verification failed.");
        }

        return googleIdToken.getPayload();
    }
}
