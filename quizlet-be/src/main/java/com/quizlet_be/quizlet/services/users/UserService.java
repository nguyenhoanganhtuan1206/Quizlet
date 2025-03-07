package com.quizlet_be.quizlet.services.users;

import com.quizlet_be.quizlet.dto.auths.AuthRequest;
import com.quizlet_be.quizlet.dto.users.UserSignUpDTO;
import com.quizlet_be.quizlet.persistent.roles.RoleEntity;
import com.quizlet_be.quizlet.persistent.users.UserEntity;
import com.quizlet_be.quizlet.repositories.users.UserRepository;
import com.quizlet_be.quizlet.services.auths.JwtTokenService;
import com.quizlet_be.quizlet.services.roles.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.quizlet_be.quizlet.error.CommonError.supplyBadRequestException;
import static com.quizlet_be.quizlet.services.users.UserError.supplyUserNotFound;
import static java.time.Instant.now;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenService jwtTokenService;

    private final RoleService roleService;

    public UserEntity findByEmail(final String email) {
        return userRepository.findByEmail(email).orElseThrow(supplyUserNotFound("Email", email));
    }

    public void createNewUser(UserSignUpDTO userRequest) {
        final RoleEntity role = roleService.findByName("USER");

        final UserEntity newUser = UserEntity.builder()
                .fullName(userRequest.getFullName())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .createdAt(now())
                .roleId(role.getId())
                .build();

        userRepository.save(newUser);
    }

    public String login(final AuthRequest authRequest) {
        final UserEntity userFound = findByEmail(authRequest.getEmail());

        if (!passwordEncoder.matches(authRequest.getPassword(), userFound.getPassword())) {
            throw supplyBadRequestException("Your email or password is incorrect! Please try again").get();
        }

        return jwtTokenService.generateToken(userFound);
    }
}
