package com.quizlet_be.quizlet.persistent.refreshtokens;

import com.quizlet_be.quizlet.services.refreshtokens.RefreshToken;
import lombok.experimental.UtilityClass;

@UtilityClass
public class RefreshTokenEntityMapper {

    public static RefreshTokenEntity toRefreshTokenEntity(final RefreshToken refreshToken) {
        return RefreshTokenEntity.builder()
                .id(refreshToken.getId())
                .token(refreshToken.getToken())
                .expiredAt(refreshToken.getExpiredAt())
                .createdAt(refreshToken.getCreatedAt())
                .revoked(refreshToken.isRevoked())
                .userId(refreshToken.getUserId())
                .build();
    }
}
