package com.quizlet_be.quizlet.services.flashset;

import com.quizlet_be.quizlet.persistent.flashset.FlashSetEntity;
import lombok.experimental.UtilityClass;

import java.util.Set;
import java.util.stream.Collectors;

@UtilityClass
public class FlashSetMapper {

    public static FlashSet toFlashSet(final FlashSetEntity flashSetEntity) {
        return FlashSet.builder()
                .id(flashSetEntity.getId())
                .description(flashSetEntity.getDescription())
                .createdAt(flashSetEntity.getCreatedAt())
                .updatedAt(flashSetEntity.getUpdatedAt())
                .folderId(flashSetEntity.getFolderId())
                .build();
    }

    public static Set<FlashSet> toFlashSets(final Set<FlashSetEntity> flashSetEntities) {
        return flashSetEntities.stream()
                .map(FlashSetMapper::toFlashSet)
                .collect(Collectors.toSet());
    }
}
