package com.quizlet_be.quizlet.services.users;

import com.quizlet_be.quizlet.dto.users.UserSignUpDTO;
import com.quizlet_be.quizlet.services.auths.AuthService;
import lombok.experimental.UtilityClass;

import java.util.logging.Level;
import java.util.logging.Logger;

import static com.quizlet_be.quizlet.error.CommonError.supplyBadRequestException;
import static java.lang.String.format;
import static org.apache.commons.lang3.StringUtils.isBlank;

@UtilityClass
public class UserValidation {

    private final Logger logger = Logger.getLogger(UserValidation.class.getName());

    public static void validateCreateUser(final UserSignUpDTO user) {
        validateUserEmpty("Username", user.getFullName());
        validateUserEmpty("Email", user.getEmail());
    }

    private static <T> void validateUserEmpty(final T type, final String value) {
        if (isBlank(value)) {
            logger.log(Level.SEVERE, format("%s cannot be empty", type));
            throw supplyBadRequestException("%s cannot be empty", type).get();
        }
    }
}
