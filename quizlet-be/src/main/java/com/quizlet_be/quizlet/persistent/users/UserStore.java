package com.quizlet_be.quizlet.persistent.users;

import com.quizlet_be.quizlet.repositories.users.UserRepository;
import com.quizlet_be.quizlet.services.users.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.quizlet_be.quizlet.persistent.users.UserEntityMapper.*;

@Repository
@RequiredArgsConstructor
public class UserStore {

    private final UserRepository userRepository;

    public List<User> findAll() {
        return toUsers(userRepository.findAll());
    }

    public void save(final User user) {
        toUser(userRepository.save(toUserEntity(user)));
    }

    public Optional<User> findByEmail(final String email) {
        return userRepository.findByEmail(email)
                .map(UserEntityMapper::toUser);
    }
}
