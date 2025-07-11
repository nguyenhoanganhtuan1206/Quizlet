package com.quizlet_be.quizlet.error;

import org.springframework.http.HttpStatus;

public class AccessDeniedException  extends DomainException {
    public AccessDeniedException(String message, Object... args) {
        super(HttpStatus.FORBIDDEN, message, args);
    }
}
