package com.quizlet_be.quizlet.properties;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtProperties {

    @NotBlank
    private String secret;

    @Min(1)
    private Long expiration;

    @Min(1)
    private Long refreshExpiration;
}
