package com.quizlet_be.quizlet.persistent.folder_flashset;

import com.quizlet_be.quizlet.repositories.folder_flashset.FolderFlashSetRepository;
import com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static com.quizlet_be.quizlet.persistent.folder_flashset.FolderFlashSetEntityMapper.toFolderFlashSetEntity;
import static com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSetMapper.toFolderFlashSet;
import static com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSetMapper.toFolderFlashSets;

@Repository
@RequiredArgsConstructor
public class FolderFlashSetStore {

    private final FolderFlashSetRepository folderFlashSetRepository;

    public FolderFlashSet save(final FolderFlashSet folderFlashSet) {
        return toFolderFlashSet(folderFlashSetRepository.save(toFolderFlashSetEntity(folderFlashSet)));
    }

    public List<FolderFlashSet> findByFolderId(final UUID folderId) {
        return toFolderFlashSets(folderFlashSetRepository.findByFolderId(folderId));
    }

    public List<FolderFlashSet> findByFlashSetId(final UUID flashSetId) {
        return toFolderFlashSets(folderFlashSetRepository.findByFlashSetId(flashSetId));
    }

    public long countByFolderId(final UUID folderId) {
        return folderFlashSetRepository.countByFolderIdAndFlashSetIdIsNotNull(folderId);
    }
}
