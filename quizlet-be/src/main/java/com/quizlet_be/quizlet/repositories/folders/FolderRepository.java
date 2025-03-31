package com.quizlet_be.quizlet.repositories.folders;

import com.quizlet_be.quizlet.persistent.folders.FolderEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FolderRepository extends JpaRepository<FolderEntity, UUID> {

    List<FolderEntity> findAll(final Sort sort);

    List<FolderEntity> findByUserIdAndParentIdIsNull(final UUID userId, final Sort sort);

    long countByUserIdAndParentId(final UUID userId, final UUID parentId);

    Optional<FolderEntity> findByName(final String name);

    List<FolderEntity> findByParentId(final UUID parentId);
}
