package com.quizlet_be.quizlet.repositories.folder_flashset;

import com.quizlet_be.quizlet.persistent.folder_flashset.FolderFlashSetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FolderFlashSetRepository extends JpaRepository<FolderFlashSetEntity, UUID> {

    List<FolderFlashSetEntity> findByFolderId(final UUID folderId);

    List<FolderFlashSetEntity> findByFlashSetId(final UUID flashSetId);

    @Query(value = "SELECT COUNT(f) FROM folder_flashset f WHERE f.folder_id = :folderId AND f.flashset_id IS NOT NULL", nativeQuery = true)
    long countByFolderIdAndFlashSetIdIsNotNull(@Param("folderId") UUID folderId);
}
