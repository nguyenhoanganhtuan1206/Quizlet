package com.quizlet_be.quizlet.services.roles;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Role {

    private Integer id;

    private String name;
}
