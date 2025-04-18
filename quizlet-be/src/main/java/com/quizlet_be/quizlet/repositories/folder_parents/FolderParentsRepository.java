package com.quizlet_be.quizlet.repositories.folder_parents;

import com.quizlet_be.quizlet.persistent.folder_parents.FolderParentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FolderParentsRepository extends JpaRepository<FolderParentsEntity, UUID> {

    List<FolderParentsEntity> findByParentFolderId(final UUID parentFolderId);

    long countByParentFolderId(final UUID parentFolderId);
}
