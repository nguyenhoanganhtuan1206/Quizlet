package com.quizlet_be.quizlet.mapper.flashsetitems;

import com.quizlet_be.quizlet.persistent.flashsetitem.FlashSetItemEntity;
import com.quizlet_be.quizlet.services.flashsetitem.FlashSetItem;

import java.util.List;

public class FlashSetItemMapper {

    public static FlashSetItem toFlashSetItem(final FlashSetItemEntity flashSetItemEntity) {
        return FlashSetItem.builder()
                .id(flashSetItemEntity.getId())
                .answer(flashSetItemEntity.getAnswer())
                .question(flashSetItemEntity.getQuestion())
                .orderPosition(flashSetItemEntity.getOrderPosition())
                .createdAt(flashSetItemEntity.getCreatedAt())
                .updatedAt(flashSetItemEntity.getUpdatedAt())
                .flashsetId(flashSetItemEntity.getFlashSetId())
                .build();
    }

    public static List<FlashSetItem> toFlashSetItems(final List<FlashSetItemEntity> flashSetItemEntities) {
        return flashSetItemEntities
                .stream()
                .map(FlashSetItemMapper::toFlashSetItem)
                .toList();
    }
}
