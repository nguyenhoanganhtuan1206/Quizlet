package com.quizlet_be.quizlet.services.flashsetitem;

import com.quizlet_be.quizlet.error.NotFoundException;
import lombok.experimental.UtilityClass;

import java.util.function.Supplier;

import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;

@UtilityClass
public class FlashSetItemError {

    public static Supplier<NotFoundException> supplyFlashSetItemNotFoundException() {
        return supplyNotFoundException("Your FlashSet Card is not existing. Please access to another one.");
    }
}
