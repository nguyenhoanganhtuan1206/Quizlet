package com.quizlet_be.quizlet.dto.users.mapper;

import com.quizlet_be.quizlet.dto.users.UserDTO;
import com.quizlet_be.quizlet.persistent.users.UserEntity;
import org.modelmapper.ModelMapper;

public class UserDTOMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static UserDTO convertToUserDTO(final UserEntity userEntity) {
        return modelMapper.map(userEntity, UserDTO.class);
    }
}
