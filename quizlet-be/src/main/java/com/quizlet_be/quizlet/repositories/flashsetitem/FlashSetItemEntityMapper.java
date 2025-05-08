package com.quizlet_be.quizlet.repositories.flashsetitem;

import com.quizlet_be.quizlet.persistent.flashsetitem.FlashSetItemEntity;
import com.quizlet_be.quizlet.services.flashsetitem.FlashSetItem;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class FlashSetItemEntityMapper {

    public static FlashSetItemEntity toFlashSetItemEntity(final FlashSetItem flashSetItem) {
        return FlashSetItemEntity.builder()
                .id(flashSetItem.getId())
                .answer(flashSetItem.getAnswer())
                .question(flashSetItem.getQuestion())
                .orderPosition(flashSetItem.getOrderPosition())
                .createdAt(flashSetItem.getCreatedAt())
                .updatedAt(flashSetItem.getUpdatedAt())
                .flashsetId(flashSetItem.getFlashsetId())
                .build();
    }

    public static List<FlashSetItemEntity> toFlashSetItemEntities(final List<FlashSetItem> flashSetItems) {
        return flashSetItems.stream()
                .map(FlashSetItemEntityMapper::toFlashSetItemEntity)
                .toList();
    }
}
