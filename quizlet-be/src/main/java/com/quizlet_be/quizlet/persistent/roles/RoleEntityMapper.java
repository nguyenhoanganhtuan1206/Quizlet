package com.quizlet_be.quizlet.persistent.roles;

import com.quizlet_be.quizlet.services.roles.Role;
import lombok.experimental.UtilityClass;

@UtilityClass
public class RoleEntityMapper {

    public static Role toRole(final RoleEntity roleEntity) {
        return Role.builder()
                .id(roleEntity.getId())
                .name(roleEntity.getName())
                .build();
    }
}
