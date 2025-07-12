package com.quizlet_be.quizlet.api.auth;

import com.quizlet_be.quizlet.dto.auths.AuthRequestDTO;
import com.quizlet_be.quizlet.dto.auths.AuthResponseDTO;
import com.quizlet_be.quizlet.dto.auths.RefreshTokenRequestDTO;
import com.quizlet_be.quizlet.dto.auths.SocialAuthRequestDTO;
import com.quizlet_be.quizlet.dto.users.UserSignUpDTO;
import com.quizlet_be.quizlet.services.auths.AuthService;
import com.quizlet_be.quizlet.services.refreshtokens.RefreshTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auths")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthController {

    private final AuthService authService;

    private final RefreshTokenService refreshTokenService;

    @Operation(summary = "Signup for the new user")
    @PostMapping("signup")
    public void signUp(final @Valid @RequestBody UserSignUpDTO userSignUpDTO) {
        authService.signup(userSignUpDTO);
    }

    @Operation(summary = "Login by Credentials")
    @PostMapping("login")
    public AuthResponseDTO loginByCredentials(final @Valid @RequestBody AuthRequestDTO authRequest) {
        return authService.loginByCredentials(authRequest);
    }

    @Operation(summary = "Login by Google account")
    @PostMapping("oauth2/google")
    public AuthResponseDTO loginByGoogle(final @RequestBody SocialAuthRequestDTO googleAuthRequestDTO) {
        return authService.loginByGoogle(googleAuthRequestDTO.getAccessToken());
    }

    @Operation(summary = "Login by Facebook Account")
    @PostMapping("oauth2/facebook")
    public AuthResponseDTO loginByFacebook(final @RequestBody SocialAuthRequestDTO facebookAuthRequestDTO) {
        return authService.loginByFacebook(facebookAuthRequestDTO);
    }

    @Operation(summary = "Refresh Token")
    @PostMapping("refresh-token")
    public AuthResponseDTO refreshToken(final @Valid @RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO) {
        return refreshTokenService.refreshToken(refreshTokenRequestDTO.getRefreshToken());
    }
}

