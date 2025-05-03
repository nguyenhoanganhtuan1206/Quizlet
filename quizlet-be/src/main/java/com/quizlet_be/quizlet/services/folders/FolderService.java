package com.quizlet_be.quizlet.services.folders;

import com.quizlet_be.quizlet.dto.folders.FolderCreateUpdateDTO;
import com.quizlet_be.quizlet.dto.folders.FolderFlashSetDetailResponseDTO;
import com.quizlet_be.quizlet.dto.folders.FolderSummaryDTO;
import com.quizlet_be.quizlet.error.ConflictException;
import com.quizlet_be.quizlet.error.NotFoundException;
import com.quizlet_be.quizlet.persistent.folders.FolderStore;
import com.quizlet_be.quizlet.services.folder_parents.FolderParents;
import com.quizlet_be.quizlet.services.folder_parents.FolderParentsService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static com.quizlet_be.quizlet.error.CommonError.*;
import static com.quizlet_be.quizlet.mapper.folders.FolderSummaryDTOMapper.toFolderSummaryDTO;
import static com.quizlet_be.quizlet.services.folders.FolderValidation.validateDuplicatedChildFolder;
import static com.quizlet_be.quizlet.services.folders.FolderValidation.validateRestrictFolderAccess;
import static com.quizlet_be.quizlet.utils.SortUtilities.createSingleSort;
import static java.time.Instant.now;

@Service
@RequiredArgsConstructor
public class FolderService {

    private static final Logger LOGGER = Logger.getLogger(FolderService.class.getName());
    private final FolderStore folderStore;

    private final FolderFlashSetManagerService folderFlashSetManagerService;

    private final FolderParentsService folderParentsService;

    /**
     * Finds a folder by its ID.
     *
     * @param folderId The ID of the folder to find.
     * @return The Folder entity.
     * @throws @BadRequestException If the folder is not found.
     */
    public Folder findById(final UUID folderId) {
        return folderStore.findById(folderId)
                .orElseThrow(supplyNotFoundException("The folder ID with %s not existed!", folderId));
    }

    /**
     * Find folders by ids and verify all the folder is not existing
     *
     * @param @{@link Set}<UUID> folderId
     * @return @{@link List<Folder>}
     * @throws @{@link NotFoundException}
     */
    public Set<Folder> findAllByIds(final List<UUID> folderIds) {
        final Set<UUID> uniqueFolderIds = new HashSet<>(folderIds);

        // Remove all folders duplicated
        if (uniqueFolderIds.size() != folderIds.size()) {
            LOGGER.warning("Duplicate folder IDs detected, deduplicated to: " + uniqueFolderIds);
        }

        // Fetch all the folders
        return uniqueFolderIds.stream()
                .map(this::findById)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
    }

    /**
     * Retrieves detailed information about a folder, including its child folders and associated flash sets.
     *
     * @param folderId The ID of the folder to retrieve details for.
     * @return A DTO containing the folder details, summaries of child folders, and associated flash sets.
     * @throws NotFoundException If the folder with the specified ID does not exist.
     */
    public FolderFlashSetDetailResponseDTO findFolderDetail(final UUID folderId) {
        try {
            final Folder folder = findById(folderId);
            final List<Folder> childrenFolders = findByParentId(folder.getId());
//            final List<FlashSet> flashSets = folderFlashSetService.handle(folderId);

            return FolderFlashSetDetailResponseDTO.builder()
                    .folder(folder)
                    .foldersSummaryChildren(mapFoldersToFolderSummaryDTOs(childrenFolders))
                    .flashSets(new ArrayList<>())
                    .build();
        } catch (NotFoundException ex) {
            LOGGER.log(Level.SEVERE, ex.getMessage(), ex);
            throw supplyBadRequestException(ex.getMessage()).get();
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, ex.getMessage(), ex);
            throw supplyBadRequestException("Unexpected while get the Folder").get();
        }
    }

    /**
     * Retrieves list children folders within the folder id
     *
     * @param parentId The ID of the parent folder to retrieve details for.
     * @return List<Folder>
     */
    public List<Folder> findByParentId(final UUID parentId) {
        final List<FolderParents> folderParents = folderParentsService.findByParentFolderId(parentId);

        return folderParents.stream()
                .map(folder -> findById(folder.getChildFolderId()))
                .toList();
    }

    /**
     * Retrieves list all folders by user id (Including the parent and children folders)
     *
     * @param userId
     * @param sortDirection is the property to decide asc or desc
     */
    public List<FolderSummaryDTO> findByUserId(final UUID userId, final String sortDirection) {
        final Sort sort = createSingleSort(sortDirection, "createdAt");
        final List<Folder> folders = folderStore.findByUserId(userId, sort);

        return folders
                .stream()
                .map(this::mapFolderToFolderSummaryDTO)
                .toList();
    }

    /**
     * Create new folder
     *
     * @param userId  The ID of the parent folder to retrieve details for.
     * @param @{@link FolderCreateUpdateDTO}
     * @return @{@link Folder}
     * @throws ConflictException                                if the Folder already existed.
     * @throws com.quizlet_be.quizlet.error.BadRequestException
     */
    @Transactional
    public Folder createFolder(final UUID userId, final FolderCreateUpdateDTO folderCreation) {
        validateFolderIsExisted(folderCreation.getName());

        try {
            final Folder folderCreated = folderStore.save(buildFolderCreation(folderCreation, userId));

            // Save Folder Children
            if (!folderCreation.getFolderChildIds().isEmpty()) {
                folderCreation.getFolderChildIds()
                        .forEach(folderChildrenId -> saveAndBuildToFolderParents(folderCreated.getId(), folderChildrenId));
            }

            LOGGER.log(Level.FINEST, "Created folder %s successfully!", folderCreated.getName());
            return folderCreated;
        } catch (ConflictException ex) {
            LOGGER.log(Level.SEVERE, "ERROR WHILE CREATING FOLDER: " + ex.getMessage(), ex);
            throw supplyBadRequestException(ex.getMessage()).get();
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "ERROR WHILE CREATING FOLDER: " + ex.getMessage(), ex);
            throw supplyBadRequestException("Unexpected while creating new Folder %s", folderCreation.getName()).get();
        }
    }

    /**
     * Update the folder
     *
     * @param @userId The ID of the parent folder to retrieve details for.
     * @param @{@link FolderCreateUpdateDTO}
     * @return @{@link Folder}
     * @throws ConflictException                              if the Folder already existed.
     * @throws com.quizlet_be.quizlet.error.NotFoundException
     */
    @Transactional
    public Folder updateFolder(
            final UUID userId,
            final UUID folderId,
            final FolderCreateUpdateDTO folderUpdateDTO
    ) {
        final Folder currentFolder = findById(folderId);

        validateRestrictFolderAccess(userId, currentFolder.getUserId());
        validateDuplicatedChildFolder(folderId, folderUpdateDTO.getFolderChildIds());

        if (!folderUpdateDTO.getName().equalsIgnoreCase(currentFolder.getName())) {
            validateFolderIsExisted(folderUpdateDTO.getName());
            currentFolder.setName(folderUpdateDTO.getName());
        }

        try {
            if (!folderUpdateDTO.getFolderChildIds().isEmpty()) {
                final List<FolderParents> currentFolderParent = folderParentsService.findByParentFolderId(folderId);
                final List<UUID> existingChildrenId = currentFolderParent.stream()
                        .map(FolderParents::getChildFolderId)
                        .toList();

                // Get the children ID to add and remove
                final Set<UUID> childrenToAdd = getDifferenceItemsInList(folderUpdateDTO.getFolderChildIds(), existingChildrenId);
                final Set<UUID> childrenToRemove = getDifferenceItemsInList(existingChildrenId, folderUpdateDTO.getFolderChildIds());

                if (!childrenToAdd.isEmpty()) {
                    childrenToAdd
                            .forEach(newFolderChildId -> {
                                saveAndBuildToFolderParents(folderId, newFolderChildId);
                            });
                }

                if (!childrenToRemove.isEmpty()) {
                    childrenToRemove
                            .forEach(childId -> folderParentsService.deleteByParentFolderId(folderId, childId));
                }
            }

            currentFolder.setDescription(folderUpdateDTO.getDescription());
            currentFolder.setUpdatedAt(now());

            return save(currentFolder);
        } catch (NotFoundException ex) {
            LOGGER.log(Level.SEVERE, "ERROR WHILE UPDATING FOLDER {FolderService || updateFolder}: " + ex.getMessage());
            throw supplyNotFoundException("Unexpected error while updating the folder %s !! Please try it again!", currentFolder.getName()).get();
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "ERROR WHILE UPDATING FOLDER {FolderService || updateFolder}: " + ex.getMessage());
            throw supplyBadRequestException("Unexpected error while updating the folder %s !! Please try it again!", currentFolder.getName()).get();
        }
    }

    /**
     * Retrieve list parent folders
     * filter all the child folder from the folderParent table.
     *
     * @param @userId.
     * @return A list of FolderSummaryDTOs with counts of child folders and flash sets.
     */
    public List<FolderSummaryDTO> findParentFoldersByUserId(final UUID userId) {
        try {
            return mapFoldersToFolderSummaryDTOs(folderStore.findParentFoldersByUserId(userId));
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, ex.getMessage(), ex);
            throw supplyBadRequestException("Something went wrong while calling folders!! Please try it again").get();
        }
    }

    /**
     * Create new the Folder.
     *
     * @params @{@link Folder}
     */
    public Folder save(final Folder folder) {
        return folderStore.save(folder);
    }

    /**
     * Maps a list of folders to their summary DTOs, including the count of child folders and flash sets.
     *
     * @param @{@link List<Folder>} The list of folders to map.
     * @return A list of FolderSummaryDTOs with counts of child folders and flash sets.
     */
    private List<FolderSummaryDTO> mapFoldersToFolderSummaryDTOs(final List<Folder> folders) {
        return folders.stream()
                .map(this::mapFolderToFolderSummaryDTO)
                .toList();
    }

    /**
     * Converts a Folder to a FolderSummaryDTO, including counts of child folders and flash sets.
     *
     * @param @{@link Folder} The Folder entity to convert.
     * @return A FolderSummaryDTO with flashsets and folder children counts.
     */
    private FolderSummaryDTO mapFolderToFolderSummaryDTO(final Folder folder) {
        final long numberChildrenFolders = folderParentsService.countByParentFolderId(folder.getId());
//        final long numberFlashSets = folderFlashSetService.countByFolderId(folder.getId());

        final FolderSummaryDTO folderSummary = toFolderSummaryDTO(folder);

        folderSummary.setNumberOfChildrenFolders(numberChildrenFolders);
        folderSummary.setNumberOfFlashSets(0);
        return folderSummary;
    }

    /**
     * Save and Build @{@link FolderParents} by @parentFolderId and @childFolderId
     */
    private void saveAndBuildToFolderParents(final UUID parentFolderId, final UUID childFolderId) {
        try {
            // Verify whether the folder is existed
            findById(childFolderId);

            final FolderParents folderParents = FolderParents.builder()
                    .parentFolderId(parentFolderId)
                    .childFolderId(childFolderId)
                    .createdAt(now())
                    .build();
            folderParentsService.save(folderParents);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "ERROR WHILE CREATING FOLDER PARENT: " + ex.getMessage(), ex);
            throw supplyBadRequestException("Unexpected while creating new Folder").get();
        }
    }

    /**
     * Build Folder by @{@link FolderCreateUpdateDTO} and @userId
     */
    private Folder buildFolderCreation(final FolderCreateUpdateDTO folderCreation, final UUID userId) {
        return Folder.builder()
                .name(folderCreation.getName())
                .description(folderCreation.getDescription())
                .createdAt(now())
                .userId(userId)
                .build();
    }

    /**
     * Get difference between 2 lists.
     *
     * @return Set<UUID>
     * @params @{@link List<UUID>}
     */
    private Set<UUID> getDifferenceItemsInList(final List<UUID> firstListId, final List<UUID> secondListId) {
        return firstListId.stream()
                .filter(firstChildId -> !secondListId.contains(firstChildId))
                .collect(Collectors.toSet());
    }

    /**
     * Validation to check whether folder is existed or not?
     *
     * @param @name
     * @throws ConflictException
     */
    private void validateFolderIsExisted(final String name) {
        final Optional<Folder> folder = folderStore.findByName(name);

        if (folder.isPresent()) {
            throw supplyConflictException("Folder with %s already taken", name).get();
        }
    }
}
