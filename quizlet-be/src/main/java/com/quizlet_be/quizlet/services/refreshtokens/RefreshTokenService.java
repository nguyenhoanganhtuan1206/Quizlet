package com.quizlet_be.quizlet.services.refreshtokens;

import com.quizlet_be.quizlet.dto.auths.AuthResponseDTO;
import com.quizlet_be.quizlet.persistent.refreshtokens.RefreshTokenStore;
import com.quizlet_be.quizlet.services.auths.JwtTokenService;
import com.quizlet_be.quizlet.services.users.User;
import com.quizlet_be.quizlet.services.users.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;
import static com.quizlet_be.quizlet.error.CommonError.supplyUnauthorizedException;
import static com.quizlet_be.quizlet.services.refreshtokens.RefreshTokenError.throwRefreshTokenValidation;
import static java.time.Instant.now;

@Service
@AllArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenStore refreshTokenStore;

    private final JwtTokenService jwtTokenService;

    private final UserService userService;

    public RefreshToken findByToken(final String token) {
        return refreshTokenStore.findByToken(token)
                .orElseThrow(supplyUnauthorizedException("Your login session is expired or invalid!! Please try to login again"));
    }

    public AuthResponseDTO refreshToken(final String token) {
        final RefreshToken refreshToken = findByToken(token);
        validateRefreshToken(refreshToken);

        final User userFound = userService.findById(refreshToken.getUserId());
        final String accessToken = jwtTokenService.generateToken(userFound);

        return AuthResponseDTO.builder()
                .token(accessToken)
                .refreshToken(refreshToken.getToken())
                .build();
    }

    private void validateRefreshToken(final RefreshToken refreshToken) {
        if (refreshToken.isRevoked()) {
            throwRefreshTokenValidation("Refresh token has been revoked");
        }

        if (refreshToken.getExpiredAt().isBefore(now())) {
            throwRefreshTokenValidation("Refresh token has expired");
        }
    }
}
