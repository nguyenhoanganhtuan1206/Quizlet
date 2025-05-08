package com.quizlet_be.quizlet.services.flashsetitem;

import com.quizlet_be.quizlet.error.NotFoundException;
import com.quizlet_be.quizlet.error.UnprocessableException;
import lombok.experimental.UtilityClass;

import java.util.function.Supplier;

import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;
import static com.quizlet_be.quizlet.error.CommonError.supplyUnprocessableException;

@UtilityClass
public class FlashSetItemError {

    public static Supplier<NotFoundException> supplyFlashSetItemNotFoundException(final String field, final Object value) {
        return supplyNotFoundException("The Flash Set with %s is %s not found", field, value);
    }

    public static Supplier<UnprocessableException> supplyFlashSetItemUnprocessableException(final String field, final Object value) {
        return supplyUnprocessableException("Something went wrong while", field, value);
    }
}
