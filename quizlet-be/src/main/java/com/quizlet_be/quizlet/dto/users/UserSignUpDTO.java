package com.quizlet_be.quizlet.dto.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignUpDTO {

    @NotBlank(message = "Your username cannot be empty")
    @Size(min = 5, max = 150, message = "Your username must be at between 5 to 150 characters")
    private String fullName;

    @NotBlank(message = "Your email cannot be empty")
    @Email(message = "Email is invalid")
    @Size(min = 9, max = 150, message = "Your Email must be between 9 to 150 characters")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 5, max = 30, message = "Password must be at between 6 to 30 characters")
    private String password;

    private String image;
}
