import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import {
  addMorePage,
  AppDispatch,
  RootState,
  useFetchFolderByIdQuery,
} from "../../store";
import { ErrorComponent, Skeleton } from "../../shared/components";
import {
  BreadCrumbNavigation,
  FolderDetailHeader,
  FolderDetails,
} from "../../components/your_library";

export default function FolderDetailsPage() {
  const { folderId } = useParams<{ folderId: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const {
    data: folderDetails,
    isLoading,
    isError,
  } = useFetchFolderByIdQuery(folderId ?? "", {
    skip: !folderId, // Skip the query if folderId is undefined
  });

  if (!folderId) {
    return <Navigate to="/not-found" replace />;
  }

  if (!folderDetails) {
    return <div>Is empty</div>;
  }

  if (isError) {
    return <ErrorComponent />;
  }

  if (isLoading) {
    return (
      <Skeleton variant="section" className="w-full" times={2}>
        <Skeleton
          textBars={2}
          className="mt-5"
          variant="text"
          height="45px"
          width="100%"
        />
      </Skeleton>
    );
  }

  return (
    <>
      <FolderDetailHeader folderDetails={folderDetails.folder} />

      <FolderDetails folderDetails={folderDetails} />
    </>
  );
}
