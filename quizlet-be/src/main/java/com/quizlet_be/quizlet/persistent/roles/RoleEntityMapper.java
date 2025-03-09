package com.quizlet_be.quizlet.persistent.roles;

import com.quizlet_be.quizlet.services.roles.Role;
import lombok.experimental.UtilityClass;
import org.modelmapper.ModelMapper;

@UtilityClass
public class RoleEntityMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static Role toRole(final RoleEntity roleEntity) {
        return modelMapper.map(roleEntity, Role.class);
    }
}
