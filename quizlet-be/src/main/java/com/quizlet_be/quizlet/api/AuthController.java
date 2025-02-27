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

import static com.quizlet_be.quizlet.dto.users.mapper.UserDTOMapper.convertToUserDTO;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userServices;

    @PostMapping("testing")
    public String testing() {
        return "Hello World";
    }

    @PostMapping("signup")
    public UserDTO signUp(final @RequestBody UserSignUpDTO userSignUpDTO) {
        return null;
//        return convertToUserDTO(userServices.createNewUser(userSignUpDTO));
    }

    @PostMapping("login")
    public void login(final @RequestBody AuthRequest authRequest) {
        userServices.login(authRequest);
    }
}
