package com.quizlet_be.quizlet.repositories.folders;

import com.quizlet_be.quizlet.persistent.folders.FolderEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FolderRepository extends JpaRepository<FolderEntity, UUID> {

    List<FolderEntity> findByUserId(final UUID userId);

    List<FolderEntity> findByUserId(final UUID userId, final Sort sort);

    /**
     * Find all Folders with userId but not including folderId
     */
    @Query(value = "SELECT f FROM FolderEntity f WHERE f.userId = :userId AND f.id != :folderId ORDER BY f.createdAt")
    List<FolderEntity> findByUserIdAndNotFolderId(@Param("userId") UUID userId, @Param("folderId") UUID folderId);

    /**
     * Finds all folders that are parents by User ID
     *
     * @return a list of folderEntity objects representing for parent folders
     */
    @Query(
            value = "SELECT DISTINCT f.* " +
                    "FROM folders f " +
                    "INNER JOIN folder_parents fp ON f.id = fp.parent_folder_id " +
                    "WHERE f.user_id = :userId",
            nativeQuery = true
    )
    List<FolderEntity> findParentFoldersByUserId(@Param("userId") UUID userId);
}
