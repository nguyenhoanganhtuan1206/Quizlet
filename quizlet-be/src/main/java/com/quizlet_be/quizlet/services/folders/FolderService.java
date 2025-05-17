package com.quizlet_be.quizlet.services.folders;

import com.quizlet_be.quizlet.dto.folders.FolderCreateUpdateDTO;
import com.quizlet_be.quizlet.dto.folders.FolderSummaryDTO;
import com.quizlet_be.quizlet.error.BadRequestException;
import com.quizlet_be.quizlet.error.ConflictException;
import com.quizlet_be.quizlet.error.NotFoundException;
import com.quizlet_be.quizlet.error.UnprocessableException;
import com.quizlet_be.quizlet.persistent.flashset.FlashSetStore;
import com.quizlet_be.quizlet.persistent.folder_flashset.FolderFlashSetStore;
import com.quizlet_be.quizlet.persistent.folders.FolderStore;
import com.quizlet_be.quizlet.services.flashset.FlashSet;
import com.quizlet_be.quizlet.services.folder_flashset.FolderFlashSet;
import com.quizlet_be.quizlet.services.folder_parents.FolderParents;
import com.quizlet_be.quizlet.services.folder_parents.FolderParentsStore;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static com.quizlet_be.quizlet.error.CommonError.*;
import static com.quizlet_be.quizlet.mapper.folders.FolderSummaryDTOMapper.toFolderSummaryDTO;
import static com.quizlet_be.quizlet.services.folders.FolderValidation.validateDuplicatedChildFolder;
import static com.quizlet_be.quizlet.services.folders.FolderValidation.validateRestrictFolderAccess;
import static com.quizlet_be.quizlet.utils.SortUtilities.createSingleSort;
import static java.lang.String.format;
import static java.time.Instant.now;

@Service
@RequiredArgsConstructor
public class FolderService {

    private static final Logger LOGGER = Logger.getLogger(FolderService.class.getName());

    private final FolderStore folderStore;

    private final FlashSetStore flashSetStore;

    private final FolderFlashSetStore folderFlashSetStore;

    private final FolderParentsStore folderParentsStore;

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
     * Retrieves detailed information about a folder, including its child folders and associated flash sets.
     *
     * @param folderId The ID of the folder to retrieve details for.
     * @return A DTO containing the folder details, summaries of child folders, and associated flash sets.
     * @throws NotFoundException If the folder with the specified ID does not exist.
     */
    public FolderSummaryDTO findFolderDetail(final UUID folderId) {
        final Folder folder = findById(folderId);

        try {
            return mapFolderToFolderSummaryDTO(folder);
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
        final List<FolderParents> folderParents = folderParentsStore.findByParentFolderId(parentId);

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
     * Retrieves list all folders by user id but not included FolderId
     *
     * @param userId
     * @param folderId
     * @return @{@link FolderSummaryDTO}
     */
    public List<FolderSummaryDTO> findByUserIdAndFolderId(final UUID userId, final UUID folderId) {
        final List<Folder> folders = folderStore.findByUserIdAndNotFolderId(userId, folderId);

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
            LOGGER.log(Level.SEVERE, "Conflict when creating the new folder: " + ex.getMessage(), ex);
            throw supplyBadRequestException(ex.getMessage()).get();
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "Error while create folder: " + ex.getMessage(), ex);
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
            currentFolder.setName(folderUpdateDTO.getName());
        }

        try {
            if (!folderUpdateDTO.getFolderChildIds().isEmpty()) {
                updateFoldersChildrenAddedToFolder(folderId, folderUpdateDTO);
            }

            if (!folderUpdateDTO.getFlashSetIds().isEmpty()) {
                updateFlashSetsAddedToFolder(folderId, folderUpdateDTO);
            }

            currentFolder.setDescription(folderUpdateDTO.getDescription());
            currentFolder.setUpdatedAt(now());

            return save(currentFolder);
        } catch (NotFoundException ex) {
            LOGGER.log(Level.SEVERE, "ERROR WHILE UPDATING FOLDER {FolderService || updateFolder} ", ex.getMessage());
            throw supplyNotFoundException("Unexpected error while updating the folder %s. Please try it again!", currentFolder.getName()).get();
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "ERROR WHILE UPDATING FOLDER {FolderService || updateFolder} ", ex.getMessage());
            throw supplyBadRequestException("Unexpected error while updating the folder %s. Please try it again!", currentFolder.getName()).get();
        }
    }

    /**
     * Remove Folder
     *
     * @param @folder
     * @return @{@link Folder}
     * @throws NotFoundException
     * @throws UnprocessableException
     */
    @Transactional
    public Folder deleteFolder(final UUID folderId) {
        final Folder folderDeletion = findById(folderId);

        try {
            folderStore.delete(folderDeletion);

            return folderDeletion;
        } catch (UnprocessableException ex) {
            throw supplyUnprocessableException("Unexpected while deleting your Folder. Please try it again").get();
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
     * Find all the @{@link FlashSet} by the list of @{@link FolderFlashSet}
     *
     * @return @{@link List<FlashSet>}
     */
    private List<FlashSet> findFlashSetsByFolderFlashSets(final List<FolderFlashSet> folderFlashSets) {
        try {
            final List<UUID> filterFlashSetIds = folderFlashSets.stream()
                    .map(FolderFlashSet::getFlashSetId)
                    .filter(Objects::nonNull)
                    .toList();
            final List<FlashSet> currentFlashSetIds = flashSetStore.findAllById(filterFlashSetIds);

            if (currentFlashSetIds.size() != filterFlashSetIds.size()) {
                final List<UUID> missingFlashSetIds = currentFlashSetIds.stream()
                        .map(FlashSet::getId)
                        .filter(id -> !filterFlashSetIds.contains(id))
                        .toList();

                LOGGER.log(Level.SEVERE, "Missing flash sets with IDs: {} ", missingFlashSetIds);
                throw supplyNotFoundException("Flash Sets not found for Ids: ", missingFlashSetIds).get();
            }

            final Map<UUID, FlashSet> flashSetMap = currentFlashSetIds.stream()
                    .collect(Collectors.toMap(FlashSet::getId, Function.identity()));

            return folderFlashSets.stream()
                    .map(FolderFlashSet::getFlashSetId)
                    .filter(Objects::nonNull)
                    .map(flashSetMap::get)
                    .toList();
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "Unexpected error while retrieving flash sets", ex);
            throw new BadRequestException("An unexpected error occurred while retrieving flash sets", ex.getMessage());
        }
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
        final List<UUID> childFolderIds = folderParentsStore.findChildIdsByParentFolderId(folder.getId());
        final List<UUID> flashSetIds = folderFlashSetStore.findFlashSetIdsByFolderId(folder.getId());
        final FolderSummaryDTO folderSummary = toFolderSummaryDTO(folder);

        final List<FlashSet> flashSets = flashSetIds.stream()
                .map(this::findFlashSetById)
                .toList();
        final List<Folder> folders = childFolderIds.stream()
                .map(this::findById)
                .toList();

        folderSummary.setFlashSets(flashSets);
        folderSummary.setFoldersChild(folders);
        return folderSummary;
    }

    /**
     * Save and Build @{@link FolderParents} by @parentFolderId and @childFolderId
     *
     * @throws @{@link NotFoundException}
     * @throws @{@link BadRequestException}
     */
    private void saveAndBuildToFolderParents(final UUID parentFolderId, final UUID childFolderId) {
        final Folder childFolder = findById(childFolderId);
        try {
            final FolderParents folderParents = FolderParents.builder()
                    .parentFolderId(parentFolderId)
                    .childFolderId(childFolder.getId())
                    .createdAt(now())
                    .build();
            folderParentsStore.save(folderParents);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "ERROR WHILE CREATING FOLDER PARENT: " + ex.getMessage(), ex);
            throw supplyBadRequestException("Unexpected while creating new Folder").get();
        }
    }

    /**
     * Delete and Update @{@link FolderParents}
     *
     * @param folderId
     * @param folderUpdateDTO
     */
    private void updateFoldersChildrenAddedToFolder(final UUID folderId, final FolderCreateUpdateDTO folderUpdateDTO) {
        final List<FolderParents> currentFolderParent = folderParentsStore.findByParentFolderId(folderId);
        final List<UUID> currentFolderChildIds = currentFolderParent.stream()
                .map(FolderParents::getChildFolderId)
                .toList();

        // Get the children ID to add and remove
        final Set<UUID> childrenToAdd = getDifferenceItemsInList(folderUpdateDTO.getFolderChildIds(), currentFolderChildIds);
        final Set<UUID> childrenToRemove = getDifferenceItemsInList(currentFolderChildIds, folderUpdateDTO.getFolderChildIds());

        if (!childrenToAdd.isEmpty()) {
            childrenToAdd
                    .forEach(newFolderChildId -> saveAndBuildToFolderParents(folderId, newFolderChildId));
        }

        if (!childrenToRemove.isEmpty()) {
            childrenToRemove
                    .forEach(childId -> deleteByFolderIdAndChildId(folderId, childId));
        }
    }

    /**
     * Delete and Update @{@link FolderFlashSet}
     *
     * @param folderId
     * @param folderUpdateDTO
     */
    private void updateFlashSetsAddedToFolder(final UUID folderId, final FolderCreateUpdateDTO folderUpdateDTO) {
        final List<FolderFlashSet> currentFolderFlashSets = folderFlashSetStore.findByFolderId(folderId);
        final List<UUID> currentFlashSetIds = currentFolderFlashSets.stream()
                .map(FolderFlashSet::getFlashSetId)
                .toList();

        // Get the children ID to add and remove
        final Set<UUID> flashSetToAdd = getDifferenceItemsInList(folderUpdateDTO.getFlashSetIds(), currentFlashSetIds);
        final Set<UUID> childrenToRemove = getDifferenceItemsInList(currentFlashSetIds, folderUpdateDTO.getFlashSetIds());

        if (!flashSetToAdd.isEmpty()) {
            flashSetToAdd
                    .forEach(flashSetId -> saveAndBuildToFolderFlashSet(folderId, flashSetId));
        }

        if (!childrenToRemove.isEmpty()) {
            childrenToRemove
                    .forEach(childId -> deleteByFolderIdAndFlashSetId(folderId, childId));
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
     * Find @FlashSet by flashSetId
     *
     * @param flashSetId
     * @return FlashSet
     */
    private FlashSet findFlashSetById(final UUID flashSetId) {
        final Optional<FlashSet> flashSet = flashSetStore.findById(flashSetId);

        if (flashSet.isEmpty()) {
            LOGGER.log(Level.SEVERE, format("Flash set with ID %s {findFlashSetById | FolderService} not found", flashSetId));
            throw supplyNotFoundException("The current Flash Set is not existed!").get();
        }

        return flashSet.get();
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
     * If you want to get the different list UUID from the first list compared to the second.
     * <p>
     * List 1: [1,2,3] and List 2: [2,3,5]
     * getDifferenceItemsInList(list1, list2) -> 1
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
     * Save and Build @{@link FolderFlashSet} by @folderId and @flashSetId
     *
     * @throws @{@link NotFoundException}
     * @throws @{@link BadRequestException}
     */
    private void saveAndBuildToFolderFlashSet(final UUID folderId, final UUID flashSetId) {
        try {
            final FolderFlashSet folderFlashSet = FolderFlashSet.builder()
                    .folderId(folderId)
                    .flashSetId(findFlashSetById(flashSetId).getId())
                    .build();
            folderFlashSetStore.save(folderFlashSet);
        } catch (Exception ex) {
            LOGGER.log(Level.SEVERE, "ERROR WHILE CREATING FOLDER PARENT: " + ex.getMessage(), ex);
            throw supplyBadRequestException("Unexpected while creating new Folder").get();
        }
    }

    /**
     * Delete @{@link FolderParents} by @folderId and @childId
     */
    private void deleteByFolderIdAndChildId(final UUID folderId, final UUID childId) {
        final Optional<FolderParents> folderParent = folderParentsStore.findByParentFolderIdAndChildFolderId(folderId, childId);

        if (folderParent.isEmpty()) {
            LOGGER.log(Level.SEVERE, format("The Folder with ID %s and children folder %s not found", folderId, childId));
            throw supplyNotFoundException("The Folder with ID %s and children folder %s not found", folderId, childId).get();
        }

        folderParentsStore.delete(folderParent.get());
    }

    /**
     * Delete @{@link FolderFlashSet} by @folderId and @folderId
     */
    private void deleteByFolderIdAndFlashSetId(final UUID folderId, final UUID flashSetId) {
        final Optional<FolderFlashSet> folderParent = folderFlashSetStore.findByFolderIdAndFlashSetId(folderId, flashSetId);

        if (folderParent.isEmpty()) {
            LOGGER.log(Level.SEVERE, format("The Folder with ID %s and flash set ID %s not found", folderId, flashSetId));
            throw supplyNotFoundException("The Folder with ID %s and flash set id %s not found", folderId, flashSetId).get();
        }

        folderFlashSetStore.delete(folderParent.get());
    }
}
