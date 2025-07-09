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

    public FlashSet save(final FlashSet flashSet) {
        return toFlashSet(flashSetRepository.save(toFlashSetEntity(flashSet)));
    }

    /**
     * Find @{@link FlashSet}
     *
     * @params flashSetId
     */
    public Optional<FlashSet> findById(final UUID flashSetId) {
        return flashSetRepository.findById(flashSetId)
                .map(FlashSetMapper::toFlashSet);
    }

    /**
     * List FlashSet by user Id
     *
     * @params userId
     */
    public List<FlashSet> findByUserId(final UUID userId) {
        return toFlashSets(flashSetRepository.findByUserId(userId));
    }

    /**
     * List FlashSet by list of IDs
     *
     * @params flashSetIds
     */
    public List<FlashSet> findAllById(final List<UUID> flashSetIds) {
        return toFlashSets(flashSetRepository.findAllById(flashSetIds));
    }

    /**
     * List FlashSet by userId not including current FolderId
     *
     * @params flashSetIds
     */
    public List<FlashSet> findByUserIdAndNotFLashSetId(final UUID userId, final UUID folderId) {
        return toFlashSets(flashSetRepository.findByUserIdAndNotFLashSetId(userId, folderId));
    }
}
