package com.quizlet_be.quizlet.configuration.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private static final String[] ALLOW_ALL_ROLES = {
            "/api/v1/auths/signup",
            "/api/v1/auths/login",
    };

    private static final String[] API_USERS_ALLOWED = {
            "/api/v1/users/**"
    };

    private static final String[] API_ADMIN_ALLOWED = {
            "/api/v1/admin/**"
    };

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for stateless APIs
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET, ALLOW_ALL_ROLES)
                        .permitAll()
                        .requestMatchers(HttpMethod.POST, ALLOW_ALL_ROLES)
                        .permitAll()
                        .requestMatchers(API_ADMIN_ALLOWED)
                        .hasRole("ADMIN")
                        .requestMatchers(API_USERS_ALLOWED)
                        .hasRole("USER")
                        .anyRequest().denyAll()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // No sessions
                );
        return httpSecurity.build();
    }
}
