package com.quizlet_be.quizlet.api.auth;

import com.quizlet_be.quizlet.dto.auths.AuthRequestDTO;
import com.quizlet_be.quizlet.dto.auths.AuthResponseDTO;
import com.quizlet_be.quizlet.dto.users.UserSignUpDTO;
import com.quizlet_be.quizlet.services.users.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.quizlet_be.quizlet.error.ValidationErrorHandling.handleValidationError;

@RestController
@RequestMapping("/api/v1/auths")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userServices;

    @PostMapping("signup")
    public void signUp(final @Valid @RequestBody UserSignUpDTO userSignUpDTO,
                       final BindingResult bindingResult) {
        handleValidationError(bindingResult);

        userServices.createNewUser(userSignUpDTO);
    }

    @PostMapping("login")
    public AuthResponseDTO login(final @Valid @RequestBody AuthRequestDTO authRequest,
                                 final BindingResult bindingResult) {
        handleValidationError(bindingResult);

        return AuthResponseDTO.builder()
                .token(userServices.login(authRequest))
                .build();
    }
}
