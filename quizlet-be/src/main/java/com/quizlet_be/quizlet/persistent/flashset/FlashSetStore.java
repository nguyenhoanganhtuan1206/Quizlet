package com.quizlet_be.quizlet.persistent.flashset;

import com.quizlet_be.quizlet.repositories.flashset.FlashSetRepository;
import com.quizlet_be.quizlet.services.flashset.FlashSet;
import com.quizlet_be.quizlet.mapper.flashsets.FlashSetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.quizlet_be.quizlet.persistent.flashset.FlashSetEntityMapper.toFlashSetEntity;
import static com.quizlet_be.quizlet.mapper.flashsets.FlashSetMapper.toFlashSet;
import static com.quizlet_be.quizlet.mapper.flashsets.FlashSetMapper.toFlashSets;

@Service
@RequiredArgsConstructor
public class FlashSetStore {

    private final FlashSetRepository flashSetRepository;

    public Optional<FlashSet> findById(final UUID flashSetId) {
        return flashSetRepository.findById(flashSetId)
                .map(FlashSetMapper::toFlashSet);
    }

    public FlashSet save(final FlashSet flashSet) {
        return toFlashSet(flashSetRepository.save(toFlashSetEntity(flashSet)));
    }

    public List<FlashSet> findByUserId(final UUID userId) {
        return toFlashSets(flashSetRepository.findByUserId(userId));
    }

    public List<FlashSet> findAllById(final List<UUID> flashSetIds) {
        return toFlashSets(flashSetRepository.findAllById(flashSetIds));
    }
}
