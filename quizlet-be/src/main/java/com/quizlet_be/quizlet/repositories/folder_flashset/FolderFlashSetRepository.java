package com.quizlet_be.quizlet.repositories.folder_flashset;

import com.quizlet_be.quizlet.persistent.folder_flashset.FolderFlashSetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FolderFlashSetRepository extends JpaRepository<FolderFlashSetEntity, UUID> {

    Optional<FolderFlashSetEntity> findByFolderIdAndFlashSetId(final UUID folderId, final UUID flashSetId);

    @Query(value = "SELECT f.flashset_id FROM folder_flashset f WHERE f.folder_id = :folderId", nativeQuery = true)
    List<UUID> findFlashSetIdsByFolderId(final UUID folderId);

    List<FolderFlashSetEntity> findByFolderId(final UUID folderId);

    List<FolderFlashSetEntity> findByFlashSetId(final UUID flashSetId);
}
