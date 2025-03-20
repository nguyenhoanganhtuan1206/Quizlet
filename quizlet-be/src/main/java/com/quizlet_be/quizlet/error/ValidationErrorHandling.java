package com.quizlet_be.quizlet.error;

import lombok.experimental.UtilityClass;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import static com.quizlet_be.quizlet.error.CommonError.supplyBadRequestException;

@UtilityClass
public class ValidationErrorHandling {

    public static void handleValidationError(final BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            for (final FieldError fieldError : bindingResult.getFieldErrors()) {
                throw supplyBadRequestException(fieldError.getDefaultMessage()).get();
            }
        }
    }
}
