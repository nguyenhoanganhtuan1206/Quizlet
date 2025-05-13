package com.quizlet_be.quizlet.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
import java.util.logging.Logger;

import static java.time.Instant.now;

@ControllerAdvice
public class ValidationErrorHandling {

    private static final Logger logger = Logger.getLogger(ValidationErrorHandling.class.getName());

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity validationErrorHandler(final MethodArgumentNotValidException exception) {
        final List<String> errors = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .toList();

        final var errorResponseDTO = ErrorResponseDTO.builder()
                .message(errors)
                .occurAt(now())
                .build();

        return ResponseEntity
                .status(HttpStatus.UNPROCESSABLE_ENTITY)
                .body(errorResponseDTO);
    }
}
