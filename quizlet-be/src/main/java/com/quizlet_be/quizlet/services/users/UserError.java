package com.quizlet_be.quizlet.services.users;

import com.quizlet_be.quizlet.error.NotFoundException;

import java.util.function.Supplier;

import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;

public class UserError {

    public static <T> Supplier<NotFoundException> supplyUserNotFound(final T fieldName, final T fieldValue) {
        return supplyNotFoundException("User with %s %s not found", fieldName, fieldValue);
    }
}
