package com.quizlet_be.quizlet.persistent.folders;

import com.quizlet_be.quizlet.repositories.folders.FolderRepository;
import com.quizlet_be.quizlet.services.folders.Folder;
import com.quizlet_be.quizlet.services.folders.FolderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.quizlet_be.quizlet.persistent.folders.FolderEntityMapper.toFolderEntity;
import static com.quizlet_be.quizlet.services.folders.FolderMapper.toFolder;
import static com.quizlet_be.quizlet.services.folders.FolderMapper.toFolders;

@Repository
@RequiredArgsConstructor
public class FolderStore {

    private final FolderRepository folderRepository;

    public List<Folder> findByUserId(final UUID userId, final Sort sort) {
        return toFolders(folderRepository.findByUserId(userId, sort));
    }

    public List<Folder> findAllByIds(final Iterable<UUID> folderIds) {
        return toFolders(folderRepository.findAllById(folderIds));
    }

    public Optional<Folder> findById(final UUID id) {
        return folderRepository.findById(id).map(FolderMapper::toFolder);
    }

    public Folder save(final Folder folder) {
        return toFolder(folderRepository.save(toFolderEntity(folder)));
    }

    public void delete(final Folder folder) {
        folderRepository.delete(toFolderEntity(folder));
    }

    public List<Folder> findByUserIdAndNotFolderId(final UUID userId, final UUID folderId) {
        return toFolders(folderRepository.findByUserIdAndNotFolderId(userId, folderId));
    }

    /**
     * Finds all folders that are parents by User ID
     *
     * @return a list of folderEntity objects representing for parent folders
     */
    public List<Folder> findParentFoldersByUserId(final UUID userId) {
        return toFolders(folderRepository.findParentFoldersByUserId(userId));
    }
}
