package com.quizlet_be.quizlet.services.folders;

import com.quizlet_be.quizlet.error.NotFoundException;
import lombok.experimental.UtilityClass;

import java.util.Objects;
import java.util.function.Supplier;

import static com.quizlet_be.quizlet.error.CommonError.supplyNotFoundException;

@UtilityClass
public class FolderError {

    public static Supplier<NotFoundException> supplyFolderNotFoundException(final String field, final Object value) {
        return supplyNotFoundException("The Folder with %s is %s not found", field, value);
    }
}
