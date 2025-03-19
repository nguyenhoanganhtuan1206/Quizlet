package com.quizlet_be.quizlet.persistent.flashset;

import com.quizlet_be.quizlet.services.flashset.FlashSet;
import lombok.experimental.UtilityClass;

@UtilityClass
public class FlashSetEntityMapper {

    public static FlashSetEntity toFlashSetEntity(final FlashSet flashSet) {
        return FlashSetEntity.builder()
                .id(flashSet.getId())
                .description(flashSet.getDescription())
                .createdAt(flashSet.getCreatedAt())
                .updatedAt(flashSet.getUpdatedAt())
                .folderId(flashSet.getFolderId())
                .build();
    }
}
