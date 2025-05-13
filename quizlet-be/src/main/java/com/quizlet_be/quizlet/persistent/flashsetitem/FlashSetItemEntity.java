package com.quizlet_be.quizlet.persistent.flashsetitem;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "flashsetitems")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlashSetItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String question;

    private String answer;

    private int orderPosition;

    private Instant createdAt;

    private Instant updatedAt;

    @Column(name = "flashset_id")
    private UUID flashSetId;
}
