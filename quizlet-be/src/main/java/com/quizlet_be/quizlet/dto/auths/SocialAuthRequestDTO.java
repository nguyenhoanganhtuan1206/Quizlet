package com.quizlet_be.quizlet.dto.auths;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SocialAuthRequestDTO {

    private String userId;

    private String accessToken;

    @NotBlank(message = "Email can't be empty")
    @Email(message = "Email is invalid")
    @Size(min = 9, max = 150, message = "Your Email must be between 9 to 150 characters")
    private String email;

    private String name;

    private String profilePictureUrl;
}