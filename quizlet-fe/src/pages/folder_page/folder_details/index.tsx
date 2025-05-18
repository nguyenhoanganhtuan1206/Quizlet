import { memo } from "react";
import { Navigate, useParams } from "react-router-dom";

import { Skeleton } from "../../../shared/components";
import {
  FolderDetailHeader,
  FolderDetails,
  ModalUpdateMaterials,
} from "@/components/your_library";
import { EmptyMaterials } from "@/components/your_library";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  setIsShowModalMaterials,
  useFetchFolderByIdQuery,
} from "@/store";
import { FolderSummaryDTO } from "@/type";

const LoadingSkeleton = memo(({ sectionSize }: { sectionSize: number }) => {
  return (
    <Skeleton variant="section" className="w-full" times={sectionSize}>
      <Skeleton
        textBars={3}
        className="mt-5"
        variant="text"
        height="45px"
        width="100%"
      />
    </Skeleton>
  );
});

const FolderContent = memo(
  ({ folderDetails }: { folderDetails: FolderSummaryDTO }) => {
    return (
      <>
        <FolderDetailHeader
          className="mt-10 mb-3"
          folderDetails={folderDetails}
        />

        <FolderDetails folderDetails={folderDetails} />
      </>
    );
  }
);

export default function FolderDetailsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { folderId } = useParams<{ folderId: string }>();

  // Fetch the minimal data needed for the modal
  const {
    data: folderDetails,
    isError,
    isLoading,
    isFetching,
  } = useFetchFolderByIdQuery(folderId ?? "", {
    skip: !folderId, // Skip the query if folderId is undefined
  });
  const isShowModalMaterials = useSelector(
    (state: RootState) => state.modalMaterialSlices.isShowModalMaterials
  );

  const handleCloseModal = () => {
    dispatch(setIsShowModalMaterials(false));
  };

  if (!folderId) {
    return <Navigate to="/not-found" replace />;
  }

  if (isError) {
    return;
  }

  if (isLoading) {
    return <LoadingSkeleton sectionSize={2} />;
  }

  if (!folderDetails) {
    return <EmptyMaterials />;
  }

  return (
    <>
      <FolderContent folderDetails={folderDetails} />

      {isFetching && <LoadingSkeleton sectionSize={1} />}

      {/*
       * Modal Add Materials
       */}
      <ModalUpdateMaterials
        isShowModal={isShowModalMaterials}
        onClose={handleCloseModal}
        currentItem={folderDetails}
      />
    </>
  );
}
