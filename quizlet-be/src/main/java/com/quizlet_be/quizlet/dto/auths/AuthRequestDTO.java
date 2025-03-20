package com.quizlet_be.quizlet.dto.auths;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthRequestDTO {

    @NotBlank(message = "Email can't be empty")
    @Email(message = "Email is invalid")
    @Size(min = 9, max = 150, message = "Your Email must be between 9 to 150 characters")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 5, max = 30, message = "Password must be at between 5 to 30 characters")
    private String password;
}
