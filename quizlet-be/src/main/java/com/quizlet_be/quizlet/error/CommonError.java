package com.quizlet_be.quizlet.error;

import lombok.experimental.UtilityClass;

import java.util.function.Supplier;

@UtilityClass
public class CommonError {

    public static Supplier<NotFoundException> supplyNotFoundException(String message, Object... args) {
        return () -> new NotFoundException(message, args);
    }

    public static Supplier<BadRequestException> supplyBadRequestException(String message, Object... args) {
        return () -> new BadRequestException(message, args);
    }

    public static Supplier<UnauthorizedException> supplyUnauthorizedException(String message, Object... args) {
        return () -> new UnauthorizedException(message, args);
    }

    public static Supplier<AccessDeniedException> supplyAccessDeniedException(String message, Object... args) {
        return () -> new AccessDeniedException(message, args);
    }

    public static Supplier<ConflictException> supplyConflictException(String message, Object... args) {
        return () -> new ConflictException(message, args);
    }

    public static Supplier<AccessDeniedException> supplyAccessDeniedError() {
        return () -> new AccessDeniedException("You do not have permission to access this resource");
    }
}
