package com.quizlet_be.quizlet.persistent.refreshtokens;

import com.quizlet_be.quizlet.repositories.refreshtoken.RefreshTokenRepository;
import com.quizlet_be.quizlet.services.auths.RefreshTokenMapper;
import com.quizlet_be.quizlet.services.refreshtokens.RefreshToken;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.quizlet_be.quizlet.persistent.refreshtokens.RefreshTokenEntityMapper.toRefreshTokenEntity;
import static com.quizlet_be.quizlet.services.auths.RefreshTokenMapper.toRefreshToken;

@Service
@AllArgsConstructor
public class RefreshTokenStore {

    private final RefreshTokenRepository refreshTokenRepository;

    public Optional<RefreshToken> findByToken(final String token) {
        return refreshTokenRepository.findByToken(token)
                .map(RefreshTokenMapper::toRefreshToken);
    }

    public RefreshToken save(final RefreshToken refreshToken) {
        return toRefreshToken(refreshTokenRepository.save(toRefreshTokenEntity(refreshToken)));
    }
}
