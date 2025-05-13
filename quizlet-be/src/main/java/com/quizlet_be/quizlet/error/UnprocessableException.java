package com.quizlet_be.quizlet.error;

import org.springframework.http.HttpStatus;

public class UnprocessableException extends DomainException {

    public UnprocessableException(String message, Object... args) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, message, args);
    }
}
