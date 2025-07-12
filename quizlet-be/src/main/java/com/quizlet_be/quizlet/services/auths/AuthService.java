package com.quizlet_be.quizlet.services.auths;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.quizlet_be.quizlet.dto.auths.AuthRequestDTO;
import com.quizlet_be.quizlet.dto.auths.AuthResponseDTO;
import com.quizlet_be.quizlet.dto.auths.SocialAuthRequestDTO;
import com.quizlet_be.quizlet.dto.users.UserSignUpDTO;
import com.quizlet_be.quizlet.persistent.users.UserStore;
import com.quizlet_be.quizlet.services.roles.Role;
import com.quizlet_be.quizlet.services.roles.RoleService;
import com.quizlet_be.quizlet.services.users.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.security.GeneralSecurityException;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import static com.quizlet_be.quizlet.error.CommonError.*;
import static com.quizlet_be.quizlet.services.users.UserError.supplyUserNotFound;
import static com.quizlet_be.quizlet.services.users.UserValidation.validateCreateUser;
import static java.lang.String.format;
import static java.time.Instant.now;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final Logger logger = Logger.getLogger(AuthService.class.getName());

    private final UserStore userStore;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${google.oauth2.client-id}")
    private String googleClientId;

    @Value("${facebook.oauth2.client-id}")
    private String facebookClientId;

    @Value("${facebook.oauth2.client-secret}")
    private String facebookClientSecret;

    /**
     * Find User by Email
     *
     * @param email
     * @return User
     * @throws com.quizlet_be.quizlet.error.NotFoundException
     */
    public User findByEmail(final String email) {
        return userStore.findByEmail(email)
                .orElseThrow(supplyUserNotFound("Email", email));
    }

    /**
     * Sign Up new account by Email and Password
     *
     * @throws com.quizlet_be.quizlet.error.UnprocessableException
     * @params userRequestDTO containing user signup details
     * @Transactional: To rollback changes if an exception occurs during a user creation.
     */
    @Transactional
    public void signup(final UserSignUpDTO userRequest) {
        validateCreateUser(userRequest);
        verifyIfUserExisted(userRequest.getEmail());

        try {
            final Role role = roleService.findByName("USER");

            final User newUser = User.builder()
                    .fullName(userRequest.getFullName())
                    .password(passwordEncoder.encode(userRequest.getPassword()))
                    .createdAt(now())
                    .roleId(role.getId())
                    .profilePictureUrl(userRequest.getProfilePictureUrl())
                    .createdAt(now())
                    .build();

            userStore.save(newUser);
        } catch (Exception ex) {
            logger.log(Level.SEVERE, format("Error {signUp || AuthService}: %s", ex.getMessage()));
            throw supplyUnprocessableException("Something went wrong while signup. Please try again").get();
        }
    }

    /**
     * Login by Credentials
     *
     * @param @{@link AuthRequestDTO}
     * @return @{@link AuthResponseDTO}
     * @throws com.quizlet_be.quizlet.error.NotFoundException
     */
    public AuthResponseDTO loginByCredentials(final AuthRequestDTO authRequest) {
        final User userFound = findByEmail(authRequest.getEmail());

        if (!passwordEncoder.matches(authRequest.getPassword(), userFound.getPassword())) {
            logger.log(Level.SEVERE, format("Incorrect email or password of user %s: ", userFound.getId()));
            throw supplyBadRequestException("Your email or password is incorrect! Please try again").get();
        }

        return handleAuthResponseDTO(userFound);
    }

    /**
     * Login by Facebook
     *
     * @param @{@link SocialAuthRequestDTO}
     * @return @{@link AuthResponseDTO}
     * @throws com.quizlet_be.quizlet.error.NotFoundException
     */
    public AuthResponseDTO loginByFacebook(final SocialAuthRequestDTO facebookAuthRequest) {
        validateFacebookToken(facebookAuthRequest);

        return handleFacebookLogin(facebookAuthRequest);
    }

    /**
     * Login by Google
     *
     * @param accessToken
     * @throws com.quizlet_be.quizlet.error.UnauthorizedException
     */
    public AuthResponseDTO loginByGoogle(final String accessToken) {
        try {
            final JsonNode userData = getUserDataFromAccessToken(accessToken);

            return handleGoogleLogin(userData);
        } catch (Exception ex) {
            logger.log(Level.SEVERE, format("Error while login by Google {AuthService | loginByGoogle}: %s", ex.getMessage()));
            throw supplyUnauthorizedException("Unexpected error occur while log in to Google").get();
        }
    }

    /**
     * Handle process login by Facebook
     *
     * @param @{@link GoogleIdToken.Payload}
     * @return @{@link AuthResponseDTO}
     * @throws @{@link com.quizlet_be.quizlet.error.UnauthorizedException}
     */
    @Transactional
    private AuthResponseDTO handleFacebookLogin(final SocialAuthRequestDTO facebookAuthRequest) {
        try {
            // Initial new account information
            final Role role = roleService.findByName("USER");
            final String email = facebookAuthRequest.getEmail();
            final String facebookId = facebookAuthRequest.getUserId();
            final String name = facebookAuthRequest.getName();
            final String profilePictureUrl = facebookAuthRequest.getProfilePictureUrl();

            final Optional<User> userLogIn = userStore.findByEmail(email);

            // Case 1: Verify user is not exist
            if (userLogIn.isEmpty()) {
                final User newUser = User.builder()
                        .fullName(name)
                        .email(email)
                        .userFacebookId(facebookId)
                        .profilePictureUrl(profilePictureUrl)
                        .createdAt(now())
                        .roleId(role.getId())
                        .build();

                return handleAuthResponseDTO(userStore.save(newUser));
            }

            // Case 2: Verify current user already existed
            final User currentUser = userLogIn.get();

            currentUser.setProfilePictureUrl(profilePictureUrl);
            currentUser.setLastLoginAt(now());
            currentUser.setUserFacebookId(facebookId);

            return handleAuthResponseDTO(userStore.save(currentUser));
        } catch (Exception ex) {
            logger.log(Level.SEVERE, "Error while login by Facebook. `user_id` is incorrect");
            throw supplyUnauthorizedException("Unexpected error occur while log in by Google. Please try it again.").get();
        }
    }

    /**
     * Handle process login by Google
     *
     * @param @{@link GoogleIdToken.Payload}
     * @return @{@link AuthResponseDTO}
     * @throws @{@link com.quizlet_be.quizlet.error.UnauthorizedException}
     */
    @Transactional
    private AuthResponseDTO handleGoogleLogin(final JsonNode userLoginData) {
        try {
            // Initial new account information
            final Role role = roleService.findByName("USER");
            final String email = userLoginData.get("email").asText();
            final String googleId = userLoginData.get("sub").asText();
            final String name = userLoginData.get("name").asText();
            final String profilePictureUrl = userLoginData.get("picture").asText();

            final Optional<User> userLogIn = userStore.findByEmail(email);

            // Case 1: Verify user is not exist
            if (userLogIn.isEmpty()) {
                final User newUser = User.builder()
                        .fullName(name)
                        .email(email)
                        .userGoogleId(googleId)
                        .profilePictureUrl(profilePictureUrl)
                        .createdAt(now())
                        .roleId(role.getId())
                        .build();

                return handleAuthResponseDTO(userStore.save(newUser));
            }

            // Case 2: Verify current user already existed
            final User currentUser = userLogIn.get();

            currentUser.setProfilePictureUrl(profilePictureUrl);
            currentUser.setLastLoginAt(now());
            currentUser.setUserGoogleId(googleId);

            return handleAuthResponseDTO(userStore.save(currentUser));
        } catch (Exception ex) {
            logger.log(Level.SEVERE, format("Error while log in by Google {AuthService | handleGoogleLogin}: %s", ex.getMessage()));
            throw supplyUnauthorizedException("Unexpected error occur while log in by Google. Please try it again.").get();
        }
    }

    /**
     * Get UserData from Google Access Token
     *
     * @param accessToken
     * @return JsonNode
     * @throws GeneralSecurityException
     * @throw @{@link com.quizlet_be.quizlet.error.UnprocessableException}
     * @throw @{@link com.quizlet_be.quizlet.error.UnauthorizedException}
     */
    private JsonNode getUserDataFromAccessToken(final String accessToken) {
        final String userInfoUri = UriComponentsBuilder
                .fromUriString("https://www.googleapis.com/oauth2/v3/userinfo") //tokeninfo
                .queryParam("access_token", accessToken)
                .build()
                .toUriString();

        try {
            final ResponseEntity<JsonNode> userEntity = restTemplate.getForEntity(userInfoUri, JsonNode.class);

            return Objects.requireNonNull(userEntity.getBody());
        } catch (NullPointerException ex) {
            logger.log(Level.SEVERE, format("Missing ResponseEntity {AuthService | verifyGoogleIdToken}: %s", ex.getMessage()));
            throw supplyUnprocessableException("Unexpected error occur while log in by Google. Please try it again.").get();
        } catch (Exception ex) {
            logger.log(Level.SEVERE, format("Error while verify GoogleId Token {AuthService | verifyGoogleIdToken}: %s", ex.getMessage()));
            throw supplyUnprocessableException("The seem your log in session is expired. Please try to login again.").get();
        }
    }

    /**
     * Validate Access Token of Facebook
     *
     * @throws @{@link com.quizlet_be.quizlet.error.UnauthorizedException}
     * @throws @{@link NullPointerException}
     */
    private void validateFacebookToken(final SocialAuthRequestDTO facebookAuthRequest) {
        final String accessToken = getAccessTokenFacebook();
        final String debugTokenUri = UriComponentsBuilder
                .fromUriString("https://graph.facebook.com/debug_token")
                .queryParam("input_token", facebookAuthRequest.getAccessToken())
                .queryParam("access_token", accessToken)
                .build()
                .toUriString();

        try {
            final ResponseEntity<JsonNode> responseEntity = restTemplate.getForEntity(debugTokenUri, JsonNode.class);
            final JsonNode data = Objects.requireNonNull(responseEntity.getBody()).get("data");

            // Error while login
            if (!data.get("is_valid").asBoolean()) {
                logger.log(Level.SEVERE, "Error while login by Facebook. `is_valid` value is false");
                throw supplyUnauthorizedException("The seem your login session is expired. Please try it again.").get();
            }

            if (!data.get("user_id").asText().equals(facebookAuthRequest.getUserId())) {
                logger.log(Level.SEVERE, "Error while login by Facebook. `user_id` is incorrect");
                throw supplyAccessDeniedException("Unexpected while login by Facebook. Please try to login again.").get();
            }
        } catch (NullPointerException ex) {
            logger.log(Level.SEVERE, format("Error while login by Facebook. {AuthService | validateFacebookToken}: %s", ex.getMessage()));
            throw supplyUnprocessableException("Unexpected while login to the Facebook. Please try to login again.").get();
        } catch (Exception ex) {
            logger.log(Level.SEVERE, format("Error while login by Facebook. {AuthService | validateFacebookToken}: %s", ex.getMessage()));
            throw supplyUnauthorizedException(ex.getMessage()).get();
        }
    }

    /**
     * Get the access token Facebook from ClientId and ClientSecret
     */
    private String getAccessTokenFacebook() {
        try {
            final String accessTokenUri = UriComponentsBuilder
                    .fromUriString("https://graph.facebook.com/oauth/access_token")
                    .queryParam("client_id", facebookClientId)
                    .queryParam("client_secret", facebookClientSecret)
                    .queryParam("grant_type", "client_credentials")
                    .build()
                    .toUriString();

            final ResponseEntity<JsonNode> responseEntity = restTemplate.getForEntity(accessTokenUri, JsonNode.class);

            return Objects.requireNonNull(responseEntity.getBody()).get("access_token").asText();
        } catch (Exception ex) {
            logger.log(Level.SEVERE, format("Error while obtain access token from Facebook. {AuthService | getAccessTokenFacebook}: %s", ex.getMessage()));
            throw supplyUnprocessableException("Unexpected while login by Facebook. Please try to login again.").get();
        }
    }

    /**
     * Verify whether user already existed by Email
     *
     * @throws com.quizlet_be.quizlet.error.ConflictException
     */
    private void verifyIfUserExisted(final String email) {
        final Optional<User> user = userStore.findByEmail(email);

        if (user.isPresent()) {
            logger.log(Level.SEVERE, format("User with id %s and email %s", user.get().getId(), user.get().getEmail()));
            throw supplyConflictException("User with email %s has been taken", email).get();
        }
    }

    /**
     * Response token and refreshToken after authenticated
     *
     * @param userLoggedIn
     * @return @{@link AuthResponseDTO}
     */
    private AuthResponseDTO handleAuthResponseDTO(final User userLoggedIn) {
        return AuthResponseDTO.builder()
                .token(jwtTokenService.generateToken(userLoggedIn))
                .refreshToken(jwtTokenService.generateRefreshToken(userLoggedIn).getToken())
                .build();
    }
}
