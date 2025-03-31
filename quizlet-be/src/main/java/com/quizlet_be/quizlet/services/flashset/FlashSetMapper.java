package com.quizlet_be.quizlet.services.flashset;

import com.quizlet_be.quizlet.persistent.flashset.FlashSetEntity;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class FlashSetMapper {

    public static FlashSet toFlashSet(final FlashSetEntity flashSetEntity) {
        return FlashSet.builder()
                .id(flashSetEntity.getId())
                .name(flashSetEntity.getName())
                .description(flashSetEntity.getDescription())
                .createdAt(flashSetEntity.getCreatedAt())
                .updatedAt(flashSetEntity.getUpdatedAt())
                .isDrafted(flashSetEntity.isDrafted())
                .build();
    }

    public static List<FlashSet> toFlashSets(final List<FlashSetEntity> flashSetEntities) {
        return flashSetEntities.stream()
                .map(FlashSetMapper::toFlashSet)
                .toList();
    }
}
