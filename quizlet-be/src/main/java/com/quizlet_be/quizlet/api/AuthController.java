package com.quizlet_be.quizlet.api;

import com.quizlet_be.quizlet.dto.auths.AuthRequest;
import com.quizlet_be.quizlet.dto.users.UserDTO;
import com.quizlet_be.quizlet.dto.users.UserSignUpDTO;
import com.quizlet_be.quizlet.services.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auths")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userServices;

    @PostMapping("signup")
    public void signUp(final @RequestBody UserSignUpDTO userSignUpDTO) {
        userServices.createNewUser(userSignUpDTO);
    }

    @PostMapping("login")
    public String login(final @RequestBody AuthRequest authRequest) {
        return userServices.login(authRequest);
    }
}
