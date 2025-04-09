package com.quizlet_be.quizlet.services.flashset;

import lombok.experimental.UtilityClass;

import static com.quizlet_be.quizlet.error.CommonError.supplyBadRequestException;

@UtilityClass
public class FlashSetError {

    public static void throwFlashSetCreationError(final String message, final Object... args) {
        throw supplyBadRequestException(message, args).get();
    }
}
