package com.quizlet_be.quizlet.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@Slf4j
@RestControllerAdvice
public class ControllerErrorHandling {

    @ExceptionHandler({DomainException.class})
    public ResponseEntity<ErrorDTO> handleDomainError(final DomainException domainException) {
        final var errorDTO = ErrorDTO.builder()
                .message(domainException.getMessage())
                .occurAt(Instant.now())
                .build();

        return ResponseEntity
                .status(domainException.getHttpStatus())
                .body(errorDTO);
    }
}
