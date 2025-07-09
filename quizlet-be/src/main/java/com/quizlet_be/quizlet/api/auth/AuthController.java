package com.quizlet_be.quizlet.api.auth;

import com.quizlet_be.quizlet.dto.auths.AuthRequestDTO;
import com.quizlet_be.quizlet.dto.auths.AuthResponseDTO;
import com.quizlet_be.quizlet.dto.auths.RefreshTokenRequestDTO;
import com.quizlet_be.quizlet.dto.users.UserSignUpDTO;
import com.quizlet_be.quizlet.services.refreshtokens.RefreshTokenService;
import com.quizlet_be.quizlet.services.users.UserService;
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

    private final UserService userServices;

    private final RefreshTokenService refreshTokenService;

    @Operation(summary = "Signup for the new user")
    @PostMapping("signup")
    public void signUp(final @Valid @RequestBody UserSignUpDTO userSignUpDTO) {
        userServices.createNewUser(userSignUpDTO);
    }

    @Operation(summary = "Login with Email and Password")
    @PostMapping("login")
    public AuthResponseDTO login(final @Valid @RequestBody AuthRequestDTO authRequest) {
        return userServices.login(authRequest);
    }

    @PostMapping("refresh-token")
    public AuthResponseDTO refreshToken(final @Valid @RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO) {
        return refreshTokenService.refreshToken(refreshTokenRequestDTO.getRefreshToken());
    }
}

