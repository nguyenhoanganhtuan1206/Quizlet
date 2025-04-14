import { Navigate, useParams } from "react-router-dom";

import { useFetchFolderByIdQuery } from "../../store";
import {
  ErrorComponent,
  Skeleton,
} from "../../shared/components";
import { BreadCrumbNavigation, FolderDetails } from "../../components/your_library";

export default function FolderDetailsPage() {
  const { folderId } = useParams<{ folderId: string }>();

  if (!folderId) {
    return <Navigate to="/not-found" replace />;
  }

  const {
    data: folderDetails,
    isLoading,
    isError,
  } = useFetchFolderByIdQuery(folderId);

  if (isLoading) {
    return (
      <Skeleton variant="section" className="w-full" times={1}>
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

  if (isError) {
    return <ErrorComponent />;
  }

  if (!folderDetails) {
    return <div>Is empty</div>;
  }

  const allPages = [
    { title: "Folders", path: "/libraries" },
    {
      title: `${folderDetails.folder.name}`,
      path: `/libraries/folders/${folderId}`,
    },
  ];

  return (
    <div>
      <BreadCrumbNavigation
        currentPage={folderDetails.folder.name}
        allPages={allPages}
      />

      <FolderDetails folderDetails={folderDetails} />
    </div>
  );
}
