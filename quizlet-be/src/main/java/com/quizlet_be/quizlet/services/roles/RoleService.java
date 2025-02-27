package com.quizlet_be.quizlet.services.roles;

import com.quizlet_be.quizlet.persistent.roles.RoleEntity;
import com.quizlet_be.quizlet.repositories.roles.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleEntity findByName(String name) {
        return roleRepository.findByName(name)
                .orElseThrow(supplyNotFoundException("Role is %s not existed", name));
    }
}
