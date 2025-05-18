package com.quizlet_be.quizlet.services.flashsetitem;

import com.quizlet_be.quizlet.error.NotFoundException;
import lombok.experimental.UtilityClass;

import java.util.function.Supplier;

import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;

@UtilityClass
public class FlashSetItemError {

    public static Supplier<NotFoundException> supplyFlashSetItemNotFoundException(final String field, final Object value) {
        return supplyNotFoundException("The Flash Set with %s is %s not found", field, value);
    }
}
