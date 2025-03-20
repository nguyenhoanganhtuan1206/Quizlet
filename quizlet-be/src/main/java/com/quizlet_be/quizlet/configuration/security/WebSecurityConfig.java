package com.quizlet_be.quizlet.configuration.security;

import com.quizlet_be.quizlet.configuration.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private static final String[] ALLOW_ALL_ROLES = {
            "/api/v1/auths/signup",
            "/api/v1/auths/login",
    };

    private static final String[] API_USERS_ALLOWED = {
            "/api/v1/users/**",
            "/api/v1/folders/**",
            "/api/v1/flashsets/**"
    };

    private static final String[] API_ADMIN_ALLOWED = {
            "/api/v1/admin/**"
    };

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Value("${api.allow-hosts}")
    private String allowedHosts;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
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

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();

        // Handle allowed origins from properties
        final List<String> allowedOrigins = allowedHosts.equals("*")
                ? List.of("*")
                : Arrays.asList(allowedHosts.split(","));
        configuration.setAllowedOrigins(allowedOrigins);

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(!allowedOrigins.contains("*")); // Required for credentials with specific origins

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
