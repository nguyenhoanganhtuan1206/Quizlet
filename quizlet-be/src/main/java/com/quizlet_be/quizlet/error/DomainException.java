package com.quizlet_be.quizlet.error;

import org.springframework.http.HttpStatus;

public class DomainException extends RuntimeException {

    private final HttpStatus httpStatus;

    public DomainException(final HttpStatus httpStatus, final String message, Object... args) {
        super(String.format(message, args));
        this.httpStatus = httpStatus;
    }
}
