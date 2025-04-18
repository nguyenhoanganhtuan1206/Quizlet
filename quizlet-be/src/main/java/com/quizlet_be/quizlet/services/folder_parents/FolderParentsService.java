package com.quizlet_be.quizlet.services.folder_parents;

import com.quizlet_be.quizlet.repositories.folder_parents.FolderParentsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import static com.quizlet_be.quizlet.mapper.folder_parents.FolderParentsMapper.toFolderParents;

@Service
@AllArgsConstructor
public class FolderParentsService {

    private final FolderParentsRepository parentsRepository;

    public long countByParentFolderId(final UUID parentFolderId) {
        return parentsRepository.countByParentFolderId(parentFolderId);
    }

    public List<FolderParents> findByParentFolderId(final UUID parentFolderId) {
        return toFolderParents(parentsRepository.findByParentFolderId(parentFolderId));
    }
}
