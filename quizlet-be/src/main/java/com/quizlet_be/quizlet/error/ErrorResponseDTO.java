package com.quizlet_be.quizlet.error;

import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.List;

@Getter
@Builder
public class ErrorResponseDTO<T> {

    private T message;

    private Instant occurAt;
}
