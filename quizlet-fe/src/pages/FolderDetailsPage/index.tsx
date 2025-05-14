import { Navigate, useParams } from "react-router-dom";

import { useFetchFolderByIdQuery } from "../../store";
import { Skeleton } from "../../shared/components";
import {
  FolderDetailHeader,
  FolderDetails,
} from "../../components/your_library";
import { EmptyMaterials } from "@/components/your_library";

export default function FolderDetailsPage() {
  const { folderId } = useParams<{ folderId: string }>();

  const {
    data: folderDetails,
    isError,
    isLoading,
    isFetching,
  } = useFetchFolderByIdQuery(folderId ?? "", {
    skip: !folderId, // Skip the query if folderId is undefined
  });

  if (!folderId) {
    return <Navigate to="/not-found" replace />;
  }

  if (isError) {
    return;
  }

  if (isLoading || isFetching) {
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

  if (!folderDetails) {
    return <EmptyMaterials />;
  }

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
