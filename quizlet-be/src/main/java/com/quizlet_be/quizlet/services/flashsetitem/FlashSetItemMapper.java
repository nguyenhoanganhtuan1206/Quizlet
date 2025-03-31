package com.quizlet_be.quizlet.services.flashsetitem;

import com.quizlet_be.quizlet.persistent.flashsetitem.FlashSetItemEntity;

import java.util.List;

public class FlashSetItemMapper {

    public static FlashSetItem toFlashSetItem(final FlashSetItemEntity flashSetItemEntity) {
        return FlashSetItem.builder()
                .id(flashSetItemEntity.getId())
                .answer(flashSetItemEntity.getAnswer())
                .question(flashSetItemEntity.getQuestion())
                .createdAt(flashSetItemEntity.getCreatedAt())
                .updatedAt(flashSetItemEntity.getUpdatedAt())
                .flashsetId(flashSetItemEntity.getFlashsetId())
                .build();
    }

    public static List<FlashSetItem> toFlashSetItems(final List<FlashSetItemEntity> flashSetItemEntities) {
        return flashSetItemEntities
                .stream()
                .map(FlashSetItemMapper::toFlashSetItem)
                .toList();
    }
}
