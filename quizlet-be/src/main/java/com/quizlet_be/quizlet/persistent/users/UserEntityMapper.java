package com.quizlet_be.quizlet.persistent.users;

import com.quizlet_be.quizlet.services.users.User;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class UserEntityMapper {

    public static User toUser(final UserEntity userEntity) {
        return User.builder()
                .id(userEntity.getId())
                .fullName(userEntity.getFullName())
                .email(userEntity.getEmail())
                .password(userEntity.getPassword())
                .userGoogleId(userEntity.getUserGoogleId())
                .userFacebookId(userEntity.getUserFacebookId())
                .createdAt(userEntity.getCreatedAt())
                .lastLoginAt(userEntity.getLastLoginAt())
                .accountDisabled(userEntity.isAccountDisabled())
                .lastSendResetPasswordAt(userEntity.getLastSendResetPasswordAt())
                .codeResetPassword(userEntity.getCodeResetPassword())
                .profilePictureUrl(userEntity.getProfilePictureUrl())
                .roleId(userEntity.getRoleId())
                .build();
    }

    public static List<User> toUsers(final List<UserEntity> userEntities) {
        return userEntities.stream()
                .map(UserEntityMapper::toUser)
                .toList();
    }

    public static UserEntity toUserEntity(final User user) {
        return UserEntity.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .userFacebookId(user.getUserFacebookId())
                .userGoogleId(user.getUserGoogleId())
                .password(user.getPassword())
                .createdAt(user.getCreatedAt())
                .lastLoginAt(user.getLastLoginAt())
                .accountDisabled(user.isAccountDisabled())
                .lastSendResetPasswordAt(user.getLastSendResetPasswordAt())
                .codeResetPassword(user.getCodeResetPassword())
                .profilePictureUrl(user.getProfilePictureUrl())
                .roleId(user.getRoleId())
                .build();
    }
}
