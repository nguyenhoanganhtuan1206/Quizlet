package com.quizlet_be.quizlet.error;

import org.springframework.http.HttpStatus;

public class ConflictException extends DomainException {
    public ConflictException(String message, Object... args) {
        super(HttpStatus.CONFLICT, message, args);
    }
}
