package com.quizlet_be.quizlet.configuration.openapi;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Tuan Nguyen",
                        email = "nguyenhoanganhtuan1206@gmail.com"
                ),
                description = "OpenAPI documentation for Quizlet application",
                title = "OpenAI Quizlet Documentation - Tuan Nguyen",
                version = "1.0"
        ),
        servers = {
                @Server(
                        description = "DEV Environment",
                        url = "http://localhost:8081/"
                )
        },
        security = {
                @SecurityRequirement(
                        name = "apiQuizletAuth"
                )
        }
)
@SecurityScheme(
        name = "apiQuizletAuth",
        description = "JWT Auth Description",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenAPIConfig {}
