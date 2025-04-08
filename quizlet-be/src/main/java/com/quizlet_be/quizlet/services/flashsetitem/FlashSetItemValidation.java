package com.quizlet_be.quizlet.services.flashsetitem;

import com.quizlet_be.quizlet.dto.flashsetItems.FlashSetItemCreationDTO;
import com.quizlet_be.quizlet.dto.flashsets.FlashSetCreationRequestDTO;
import com.quizlet_be.quizlet.dto.flashsets.FlashSetUpdateRequestDTO;
import com.quizlet_be.quizlet.services.flashset.FlashSet;
import lombok.experimental.UtilityClass;

import java.util.List;
import java.util.UUID;

import static com.quizlet_be.quizlet.error.CommonError.supplyAccessDeniedException;
import static com.quizlet_be.quizlet.error.CommonError.supplyBadRequestException;

@UtilityClass
public class FlashSetItemValidation {
    public static void validateFlashSetItemCreation(
            final FlashSetCreationRequestDTO flashSetCreationDTO,
            final UUID userId
    ) {
        if (userId == null) {
            throw supplyBadRequestException("Something went wrong while creating the new flash set! Please try to login again.").get();
        }

        validateFlashSetTitle(flashSetCreationDTO.getName());

        validateLengthFlashSetItem(flashSetCreationDTO.getFlashSetItems());
    }

    public static void validateFlashSetItemUpdate(
            final FlashSetUpdateRequestDTO flashSetUpdateRequestDTO,
            final UUID userId,
            final FlashSet currentFlashSet
            ) {
        if (!currentFlashSet.getUserId().toString().equalsIgnoreCase(userId.toString())) {
            throw supplyAccessDeniedException("You doesn't permission to perform this action!").get();
        }

        validateFlashSetTitle(flashSetUpdateRequestDTO.getName());
    }

    public static void validateFlashSetTitle(final String name) {
        if (name.isBlank()) {
            throw supplyBadRequestException("You must provide the title for your flash set").get();
        }
    }

    private static void validateLengthFlashSetItem(final List<FlashSetItemCreationDTO> flashSetItems) {
        if (flashSetItems == null || flashSetItems.size() < 2) {
            throw supplyBadRequestException("You must have at least two cards to save your set").get();
        }
    }
}
