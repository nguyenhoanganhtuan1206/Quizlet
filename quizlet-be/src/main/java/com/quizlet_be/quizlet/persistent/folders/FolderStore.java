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

    public List<Folder> findAll(final Sort sort) {
        return toFolders(folderRepository.findAll(sort));
    }

    public List<Folder> findByParent(final UUID parentId) {
        return toFolders(folderRepository.findByParentId(parentId));
    }

    public Optional<Folder> findById(final UUID id) {
        return folderRepository.findById(id).map(FolderMapper::toFolder);
    }

    public Optional<Folder> findByName(final String name) {
        return folderRepository.findByName(name).map(FolderMapper::toFolder);
    }

    public Folder save(final Folder folder) {
        return toFolder(folderRepository.save(toFolderEntity(folder)));
    }

    public List<Folder> findByUserIdAndParentIdIsNull(final UUID userId, final Sort sort) {
        return toFolders(folderRepository.findByUserIdAndParentIdIsNull(userId, sort));
    }
}
