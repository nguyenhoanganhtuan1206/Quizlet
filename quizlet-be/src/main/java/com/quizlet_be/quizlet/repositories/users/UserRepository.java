package com.quizlet_be.quizlet.repositories.users;

import com.quizlet_be.quizlet.persistent.users.UserEntity;
import com.quizlet_be.quizlet.services.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    Optional<UserEntity> findByEmail(final String email);

    Optional<UserEntity> findByUserGoogleId(final String googleId);

    Optional<UserEntity> findByUserFacebookId(final String facebookId);
}
