package com.quizlet_be.quizlet.persistent.folder_flashset;

import com.quizlet_be.quizlet.repositories.folder_flashset.FolderFlashSetRepository;
import com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSet;
import com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.quizlet_be.quizlet.persistent.folder_flashset.FolderFlashSetEntityMapper.toFolderFlashSetEntity;
import static com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSetMapper.toFolderFlashSet;
import static com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSetMapper.toFolderFlashSets;

@Repository
@RequiredArgsConstructor
public class FolderFlashSetStore {

    private final FolderFlashSetRepository folderFlashSetRepository;

    public Optional<FolderFlashSet> findByFolderIdAndFlashSetId(final UUID folderId, final UUID flashSetId) {
        return folderFlashSetRepository.findByFolderIdAndFlashSetId(folderId, flashSetId)
                .map(FolderFlashSetMapper::toFolderFlashSet);
    }

    public FolderFlashSet save(final FolderFlashSet folderFlashSet) {
        return toFolderFlashSet(folderFlashSetRepository.save(toFolderFlashSetEntity(folderFlashSet)));
    }

    public void delete(final FolderFlashSet folderFlashSet) {
        folderFlashSetRepository.delete(toFolderFlashSetEntity(folderFlashSet));
    }

    /**
     * Return @{@link @FolderFlashSet} by folderId
     *
     * @param folderId
     * return List
     * */
    public List<FolderFlashSet> findByFolderId(final UUID folderId) {
        return toFolderFlashSets(folderFlashSetRepository.findByFolderId(folderId));
    }

    /**
     * Return @{@link @FolderFlashSet} by folderId
     *
     * @param folderId
     * @return List<UUID>
     * */
    public List<UUID> findFlashSetIdsByFolderId(final UUID folderId) {
        return folderFlashSetRepository.findFlashSetIdsByFolderId(folderId);
    }

    public List<FolderFlashSet> findByFlashSetId(final UUID flashSetId) {
        return toFolderFlashSets(folderFlashSetRepository.findByFlashSetId(flashSetId));
    }
}
