package com.quizlet_be.quizlet.error;

import org.springframework.http.HttpStatus;

public class BadRequestException extends DomainException {
    public BadRequestException(String message, Object... args) {
        super(HttpStatus.BAD_REQUEST, message, args);
    }
}
