package com.quizlet_be.quizlet.services.roles;

import com.quizlet_be.quizlet.persistent.roles.RoleStore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleStore roleStore;

    public Role findById(final Integer id) {
        return roleStore.findById(id)
                .orElseThrow(supplyNotFoundException("Role with id %s not found", id));
    }

    public Role findByName(String name) {
        return roleStore.findByName(name)
                .orElseThrow(supplyNotFoundException("Role is %s not existed", name));
    }
}
