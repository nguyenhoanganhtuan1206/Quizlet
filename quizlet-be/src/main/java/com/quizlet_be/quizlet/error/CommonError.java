package com.quizlet_be.quizlet.error;

import lombok.experimental.UtilityClass;

import java.util.function.Supplier;

@UtilityClass
public class CommonError {

    public static Supplier<NotFoundException> supplyNotFoundException(String message, Object... args) {
        return () -> new NotFoundException(message, args);
    }

    public static Supplier<UnauthorizedException> supplyUnauthorizedException(String message, Object... args) {
        return () -> new UnauthorizedException(message, args);
    }

    public static Supplier<AccessDeniedException> supplyAccessDeniedException(String message, Object... args) {
        return () -> new AccessDeniedException(message, args);
    }
}
