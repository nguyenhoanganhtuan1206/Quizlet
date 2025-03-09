package com.quizlet_be.quizlet.dto.users;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignUpDTO {

//    @NotBlank(message = "Username can't be empty")
//    @Size(min = 6, max = 50, message = "Username must be at between 6 to 50 characters")
    private String fullName;

//    @NotBlank(message = "Email can't be empty")
//    @Size(min = 9, message = "Email must be at least 9 characters")
    private String email;

//    @NotBlank(message = "Phone number cannot be empty")
//    @Size(min = 9, max = 11, message = "Phone number is invalid")
    private String phoneNumber;

//    @NotBlank(message = "Password cannot be empty")
//    @Size(min = 6, max = 30, message = "Password must be at between 6 to 30 characters")
    private String password;

//    @NotBlank(message = "Address cannot be empty")
//    @Size(min = 3, message = "Address is invalid")
    private String address;
}
