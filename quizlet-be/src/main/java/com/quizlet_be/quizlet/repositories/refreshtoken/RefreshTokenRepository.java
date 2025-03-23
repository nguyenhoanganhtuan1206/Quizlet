package com.quizlet_be.quizlet.repositories.refreshtoken;

import com.quizlet_be.quizlet.persistent.refreshtokens.RefreshTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, UUID> {

    Optional<RefreshTokenEntity> findByToken(final String token);

    void deleteByUserId(final UUID userId);
}
