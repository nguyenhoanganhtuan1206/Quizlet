package com.quizlet_be.quizlet.services.flashset;

import com.quizlet_be.quizlet.error.NotFoundException;
import lombok.experimental.UtilityClass;

import java.util.function.Supplier;

import static com.quizlet_be.quizlet.error.CommonError.supplyBadRequestException;
import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;

@UtilityClass
public class FlashSetError {

    public static Supplier<NotFoundException> supplyFlashSetNotFoundException(final Object... args) {
        throw supplyNotFoundException("The Flash Set with %s is %s is not existed!", args).get();
    }

    public static void throwFlashSetCreationError(final String message, final Object... args) {
        throw supplyBadRequestException(message, args).get();
    }
}
