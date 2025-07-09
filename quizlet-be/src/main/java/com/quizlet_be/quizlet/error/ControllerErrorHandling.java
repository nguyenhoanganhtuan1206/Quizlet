package com.quizlet_be.quizlet.error;

import io.swagger.v3.oas.annotations.Hidden;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@Slf4j
@RestControllerAdvice
@Hidden
public class ControllerErrorHandling {

    @ExceptionHandler({DomainException.class})
    public ResponseEntity<ErrorResponseDTO> handleDomainError(final DomainException domainException) {
        final var errorDTO = ErrorResponseDTO.builder()
                .message(domainException.getMessage())
                .occurAt(Instant.now())
                .build();

        return ResponseEntity
                .status(domainException.getHttpStatus())
                .body(errorDTO);
    }
}
