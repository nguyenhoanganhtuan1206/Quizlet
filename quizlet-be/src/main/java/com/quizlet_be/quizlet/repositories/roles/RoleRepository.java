package com.quizlet_be.quizlet.repositories.roles;

import com.quizlet_be.quizlet.persistent.roles.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Integer> {

    Optional<RoleEntity> findByName(final String name);
}
