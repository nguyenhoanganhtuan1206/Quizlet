package com.quizlet_be.quizlet.services.flashset;

import com.quizlet_be.quizlet.error.NotFoundException;
import lombok.experimental.UtilityClass;

import java.util.function.Supplier;

import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;

@UtilityClass
public class FlashSetValidation {

    /**
     *
     * @param type is the property in the Folder (e.g: name, id,...)
     * @param value is the value of this property
     * Eg @output: The $type folder with $value not found
     */
    public static <T, V> Supplier<NotFoundException> supplyFlashSetNotFound(final T type, final V value) {
        throw supplyNotFoundException("The %t Flash Set with %v is not found", type, value).get();
    }
}
