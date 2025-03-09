package com.quizlet_be.quizlet.services.users;

import com.quizlet_be.quizlet.dto.users.UserSignUpDTO;
import lombok.experimental.UtilityClass;

import static com.quizlet_be.quizlet.error.CommonError.supplyBadRequestException;
import static org.apache.commons.lang3.StringUtils.isBlank;

@UtilityClass
public class UserValidation {

    public static void validateCreateUser(final UserSignUpDTO user) {
        validateUserEmpty("Username", user.getFullName());
        validateUserEmpty("Email", user.getEmail());
    }

    private static <T> void validateUserEmpty(final T type, final String value) {
        if (isBlank(value)) {
            throw supplyBadRequestException("%s can't be empty", type).get();
        }
    }
}
