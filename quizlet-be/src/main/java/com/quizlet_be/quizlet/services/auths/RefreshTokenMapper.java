package com.quizlet_be.quizlet.services.auths;

import com.quizlet_be.quizlet.persistent.refreshtokens.RefreshTokenEntity;
import com.quizlet_be.quizlet.services.refreshtokens.RefreshToken;
import lombok.experimental.UtilityClass;

@UtilityClass
public class RefreshTokenMapper {

    public static RefreshToken toRefreshToken(final RefreshTokenEntity refreshTokenEntity) {
        return RefreshToken.builder()
                .id(refreshTokenEntity.getId())
                .token(refreshTokenEntity.getToken())
                .expiredAt(refreshTokenEntity.getExpiredAt())
                .createdAt(refreshTokenEntity.getCreatedAt())
                .revoked(refreshTokenEntity.isRevoked())
                .userId(refreshTokenEntity.getUserId())
                .build();
    }
}
