package com.quizlet_be.quizlet.services.users;

import com.quizlet_be.quizlet.dto.auths.AuthRequestDTO;
import com.quizlet_be.quizlet.dto.auths.AuthResponseDTO;
import com.quizlet_be.quizlet.dto.users.UserSignUpDTO;
import com.quizlet_be.quizlet.persistent.users.UserStore;
import com.quizlet_be.quizlet.services.auths.JwtTokenService;
import com.quizlet_be.quizlet.services.roles.Role;
import com.quizlet_be.quizlet.services.roles.RoleService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

import static com.quizlet_be.quizlet.error.CommonError.*;
import static com.quizlet_be.quizlet.services.users.UserError.supplyUserNotFound;
import static com.quizlet_be.quizlet.services.users.UserValidation.validateCreateUser;
import static java.time.Instant.now;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserStore userStore;

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenService jwtTokenService;

    private final RoleService roleService;

    public User findByEmail(final String email) {
        return userStore.findByEmail(email)
                .orElseThrow(supplyUserNotFound("Email", email));
    }

    public User findById(final UUID userId) {
        return userStore.findById(userId)
                .orElseThrow(supplyUnauthorizedException("The seem your session is expired please try to login again"));
    }

    /*
     * Creates a new user based on the provided signup request.
     *
     * @params userRequestDTO containing user signup details
     *
     *
     * @Transactional: To rollback changes if an exception occurs during a user creation.
     * */
    @Transactional
    public void createNewUser(final UserSignUpDTO userRequest) {
        validateCreateUser(userRequest);
        verifyIfUserExisted(userRequest.getEmail());

        try {
            final Role role = roleService.findByName("USER");

            final User newUser = User.builder()
                    .fullName(userRequest.getFullName())
                    .password(passwordEncoder.encode(userRequest.getPassword()))
                    .createdAt(now())
                    .roleId(role.getId())
                    .image(userRequest.getImage())
                    .build();

            userStore.save(newUser);
        } catch (Exception ex) {
            throw supplyBadRequestException("Something went wrong! Please try again").get();
        }
    }

    public AuthResponseDTO login(final AuthRequestDTO authRequest) {
        final User userFound = findByEmail(authRequest.getEmail());

        if (!passwordEncoder.matches(authRequest.getPassword(), userFound.getPassword())) {
            throw supplyBadRequestException("Your email or password is incorrect! Please try again").get();
        }

        return AuthResponseDTO.builder()
                .token(jwtTokenService.generateToken(userFound))
                .refreshToken(jwtTokenService.generateRefreshToken(userFound).getToken())
                .build();
    }

    private void verifyIfUserExisted(final String email) {
        final Optional<User> user = userStore.findByEmail(email);

        if (user.isPresent()) {
            throw supplyConflictException("User with email %s has been taken", email).get();
        }
    }
}
