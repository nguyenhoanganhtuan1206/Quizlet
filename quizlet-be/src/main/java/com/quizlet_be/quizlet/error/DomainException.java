package com.quizlet_be.quizlet.error;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
public class DomainException extends RuntimeException {

    private final HttpStatus httpStatus;

    public DomainException(final HttpStatus httpStatus, final String message, Object... args) {
        super(String.format(message, args));
        this.httpStatus = httpStatus;
    }
}
