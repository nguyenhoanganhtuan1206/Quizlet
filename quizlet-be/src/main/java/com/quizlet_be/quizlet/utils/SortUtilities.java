package com.quizlet_be.quizlet.utils;

import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Sort;

import static com.quizlet_be.quizlet.error.CommonError.supplyBadRequestException;

@UtilityClass
public class SortUtilities {

    /**
     * @param sortDirection is the property to decide asc or desc
     * @param sortedBy      is the property sorted by field (createdAt, updatedAt, ...)
     */
    public static Sort createSingleSort(final String sortDirection, final String sortedBy) {
        if (sortedBy.isEmpty()) {
            throw supplyBadRequestException("Sort field cannot be null empty").get();
        }

        Sort sort = Sort.by(sortedBy.trim());

        if ("desc".equalsIgnoreCase(sortDirection)) {
            sort = sort.descending();
        } else if ("asc".equalsIgnoreCase(sortDirection)) {
            sort = sort.ascending();
        } else {
            throw supplyBadRequestException("Sort direction must be 'asc' or 'desc'").get();
        }

        return sort;
    }
}
