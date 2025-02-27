package com.quizlet_be.quizlet.services;

import com.quizlet_be.quizlet.persistent.users.UserEntity;
import com.quizlet_be.quizlet.repositories.users.UserRepository;
import org.springframework.stereotype.Service;

import static com.quizlet_be.quizlet.services.users.UserError.supplyUserNotFound;

@Service
public abstract class AbstractUserService {

    private final UserRepository userRepository;

    public AbstractUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(supplyUserNotFound("Email", email));
    }
}
