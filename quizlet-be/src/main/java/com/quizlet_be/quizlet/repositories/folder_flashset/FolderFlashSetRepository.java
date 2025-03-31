package com.quizlet_be.quizlet.repositories.folder_flashset;

import com.quizlet_be.quizlet.persistent.folder_flashset.FolderFlashSetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FolderFlashSetRepository extends JpaRepository<FolderFlashSetEntity, UUID> {

    List<FolderFlashSetEntity> findByFolderId(final UUID folderId);

    List<FolderFlashSetEntity> findByFlashSetId(final UUID flashSetId);

    long countByFolderIdAndFlashSetIdIsNotNull(final UUID folderId);
}
