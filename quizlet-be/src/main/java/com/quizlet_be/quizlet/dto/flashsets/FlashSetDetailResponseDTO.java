package com.quizlet_be.quizlet.dto.flashsets;

import com.quizlet_be.quizlet.services.flashset.FlashSet;
import com.quizlet_be.quizlet.services.flashsetitem.FlashSetItem;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
public class FlashSetDetailResponseDTO {

    private UUID id;

    private String name;

    private String description;

    private Instant createdAt;

    private Instant updatedAt;

    private boolean isDrafted;

    private UUID folderId;

    private List<FlashSetItem> flashSetItems;
}
