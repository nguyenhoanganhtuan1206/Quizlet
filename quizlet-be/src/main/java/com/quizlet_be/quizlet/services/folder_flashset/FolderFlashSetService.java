package com.quizlet_be.quizlet.services.folder_flashset;

import com.quizlet_be.quizlet.persistent.folder_flashset.FolderFlashSetStore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FolderFlashSetService {

    private final FolderFlashSetStore folderFlashSetStore;

    public FolderFlashSet save(final FolderFlashSet folderFlashSet) {
        return folderFlashSetStore.save((folderFlashSet));
    }

    public List<FolderFlashSet> findByFolderId(final UUID folderId) {
        return folderFlashSetStore.findByFolderId(folderId);
    }

    public List<FolderFlashSet> findByFlashSetId(final UUID flashSetId) {
        return folderFlashSetStore.findByFlashSetId(flashSetId);
    }

    public long countByFolderId(final UUID folderId) {
        return folderFlashSetStore.countByFolderId(folderId);
    }
}
