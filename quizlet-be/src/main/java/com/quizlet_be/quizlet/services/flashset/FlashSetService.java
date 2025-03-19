package com.quizlet_be.quizlet.services.flashset;

import com.quizlet_be.quizlet.persistent.flashset.FlashSetStore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FlashSetService {

    private final FlashSetStore flashSetStore;

    public Set<FlashSet> findFolderId(final UUID folderId) {
        return flashSetStore.findByFolderId(folderId);
    }
}
