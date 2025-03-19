package com.quizlet_be.quizlet.persistent.flashset;

import com.quizlet_be.quizlet.repositories.flashset.FlashSetRepository;
import com.quizlet_be.quizlet.services.flashset.FlashSet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

import static com.quizlet_be.quizlet.services.flashset.FlashSetMapper.toFlashSets;

@Service
@RequiredArgsConstructor
public class FlashSetStore {

    private final FlashSetRepository flashSetRepository;

    public Set<FlashSet> findByFolderId(final UUID folderId) {
        return toFlashSets(flashSetRepository.findByFolderId(folderId));
    }
}
