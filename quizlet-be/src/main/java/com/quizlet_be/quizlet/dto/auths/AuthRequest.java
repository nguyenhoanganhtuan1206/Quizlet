package com.quizlet_be.quizlet.dto.auths;

import lombok.Getter;

@Getter
public class AuthRequest {

    private String email;
    private String password;
}
