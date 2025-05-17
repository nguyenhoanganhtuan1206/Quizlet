package com.quizlet_be.quizlet.repositories.folder_parents;

import com.quizlet_be.quizlet.persistent.folder_parents.FolderParentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FolderParentsRepository extends JpaRepository<FolderParentsEntity, UUID> {

    Optional<FolderParentsEntity> findByParentFolderIdAndChildFolderId(final UUID parentFolderId, final UUID childFolderId);

    List<FolderParentsEntity> findByParentFolderId(final UUID parentFolderId);

    /**
     * Retrieves the list of child folder IDs for a given parent folder ID.
     *
     * @param parentFolderId The UUID of the parent folder.
     * @return A list of UUIDs representing the child folder IDs.
     */
    @Query(value = "SELECT f.child_folder_id " +
            "FROM folder_parents f " +
            "WHERE f.parent_folder_id = :parentFolderId", nativeQuery = true)
    List<UUID> findChildIdsByParentFolderId(@Param("parentFolderId") UUID parentFolderId);
}
