package com.quizlet_be.quizlet.configuration.jwt;

import com.quizlet_be.quizlet.services.auths.JwtTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtTokenService jwtTokenService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        logger.info("authorizationHeader" + authorizationHeader);
        final String TOKEN_PREFIX = "Bearer ";
        if (authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX)) {
            final String token = authorizationHeader.substring(TOKEN_PREFIX.length());
            final Authentication authentication = jwtTokenService.parse(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
            logger.info("No valid Bearer token found in header");
        }

        filterChain.doFilter(request, response);
    }
}