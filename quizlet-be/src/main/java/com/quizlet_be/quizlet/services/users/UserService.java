package com.quizlet_be.quizlet.services.users;

import com.quizlet_be.quizlet.dto.auths.AuthRequest;
import com.quizlet_be.quizlet.dto.users.UserSignUpDTO;
import com.quizlet_be.quizlet.persistent.roles.RoleEntity;
import com.quizlet_be.quizlet.persistent.users.UserEntity;
import com.quizlet_be.quizlet.repositories.users.UserRepository;
import com.quizlet_be.quizlet.services.AbstractUserService;
import com.quizlet_be.quizlet.services.roles.RoleService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService extends AbstractUserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private RoleService roleService;

    public UserService(UserRepository userRepository) {
        super(userRepository);
    }

    public void createNewUser(UserSignUpDTO userRequest) {
        try {
            final RoleEntity role = roleService.findByName("USER");

            final UserEntity newUser = UserEntity.builder()
                    .fullName(userRequest.getFullName())
                    .address(userRequest.getAddress())
                    .password(passwordEncoder.encode(userRequest.getPassword()))

                    .build();
        } catch (Exception ex) {
        }
    }

    public void login(final AuthRequest authRequest) {
        UserEntity userFound = findByEmail(authRequest.getEmail());

        if (passwordEncoder.matches(authRequest.getPassword(), userFound.getPassword())) {
            System.out.println("HELLO WORLD!");
        }
    }
}
