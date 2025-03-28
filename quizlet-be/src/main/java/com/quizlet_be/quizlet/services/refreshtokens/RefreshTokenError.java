package com.quizlet_be.quizlet.services.refreshtokens;

import lombok.experimental.UtilityClass;

import static com.quizlet_be.quizlet.error.CommonError.supplyUnauthorizedException;

@UtilityClass
public class RefreshTokenError {

    public static void throwRefreshTokenValidation(final String message, final Object... args) {
        throw supplyUnauthorizedException(message, args).get();
    }
}
