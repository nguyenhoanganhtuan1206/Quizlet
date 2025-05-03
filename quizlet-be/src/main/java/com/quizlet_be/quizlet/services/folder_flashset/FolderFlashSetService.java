package com.quizlet_be.quizlet.services.folder_flashset;

import com.quizlet_be.quizlet.repositories.folder_flashset.FolderFlashSetRepository;
import com.quizlet_be.quizlet.services.flashset.FlashSet;
import com.quizlet_be.quizlet.services.flashset.FlashSetService;
import com.quizlet_be.quizlet.services.folders.FolderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.quizlet_be.quizlet.persistent.folder_flashset.FolderFlashSetEntityMapper.toFolderFlashSetEntity;
import static com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSetMapper.toFolderFlashSet;
import static com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSetMapper.toFolderFlashSets;

@Service
@RequiredArgsConstructor
public class FolderFlashSetService {

    private final FolderFlashSetRepository folderFlashSetRepository;

    private final FolderFlashSetManagerService folderFlashSetManagerService;

    public List<FlashSet> handle(final UUID folderId) {
        final List<FolderFlashSet> folderFlashSets = findByFolderId(folderId);

//        return folderFlashSets
//                .stream()
//                .map(folderFlashSet -> flashSetService.findById(folderFlashSet.getFlashSetId()))
//                .toList();
        return new ArrayList<>();
    }

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
