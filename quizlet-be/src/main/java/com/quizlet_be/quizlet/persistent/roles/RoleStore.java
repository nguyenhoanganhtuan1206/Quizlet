package com.quizlet_be.quizlet.persistent.roles;

import com.quizlet_be.quizlet.repositories.roles.RoleRepository;
import com.quizlet_be.quizlet.services.roles.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RoleStore {

    private final RoleRepository roleRepository;

    public Optional<Role> findByName(final String name) {
        return roleRepository.findByName(name).map(RoleEntityMapper::toRole);
    }
}
