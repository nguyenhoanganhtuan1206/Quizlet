package com.quizlet_be.quizlet.services.flashsetitem;

import com.quizlet_be.quizlet.repositories.flashsetitem.FlashSetItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FlashSetItemService {

    private final FlashSetItemRepository flashSetItemRepository;

    public long countByFlashsetId(final UUID flashSetId) {
        return flashSetItemRepository.countByFlashsetId(flashSetId);
    }
}
