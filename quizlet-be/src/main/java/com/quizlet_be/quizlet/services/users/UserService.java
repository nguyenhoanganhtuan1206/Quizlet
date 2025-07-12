package com.quizlet_be.quizlet.services.users;

import com.quizlet_be.quizlet.persistent.users.UserStore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

import static com.quizlet_be.quizlet.error.CommonError.supplyUnauthorizedException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserStore userStore;

    public User findById(final UUID userId) {
        return userStore.findById(userId)
                .orElseThrow(supplyUnauthorizedException("The seem your session is expired please try to login again"));
    }
}
